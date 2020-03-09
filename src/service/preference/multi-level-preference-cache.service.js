import get from "lodash/fp/get";
import constant from "lodash/fp/constant";
import join from "lodash/fp/join";

import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";

const logAndRethrowError = prefix => err => {
  console.warn(join(" > ")(prefix), err);
  throw err;
};

class MultiLevelPreferenceCacheService {
  constructor() {
    this.localForge = getLocalForgeClient();
    this.s3 = getS3Client();
  }

  readLocalPreference(set, name) {
    return this.readLocalPreferenceData(set)
      .catch(constant({}))
      .then(get(name));
  }

  writeLocalPreference(set, name, value) {
    return this.readLocalPreferenceData(set)
      .catch(constant({}))
      .then(preferenceData => ({
        ...(preferenceData || {}),
        [name]: value
      }))
      .then(updatedPreferenceData =>
        this.localForge
          .storePreference(set, updatedPreferenceData)
          .catch(
            logAndRethrowError([
              `writeLocalPreference(${set}, ${name}, ${value})`,
              "localForge.storePreference"
            ])
          )
      );
  }

  readPreference(set, name) {
    return this.readPreferenceData(set)
      .catch(constant({}))
      .then(get(name));
  }

  writePreference(set, name, value) {
    return this.readPreferenceData(set)
      .catch(constant({}))
      .then(preferenceData => ({
        ...(preferenceData || {}),
        [name]: value
      }))
      .then(updatedPreferenceData =>
        this.localForge
          .storePreference(set, updatedPreferenceData)
          .catch(
            logAndRethrowError([
              `writePreference(${set}, ${name}, ${value})`,
              "localForge.storePreference"
            ])
          )
          .then(() =>
            this.s3
              .storePreference(set, updatedPreferenceData)
              .catch(
                logAndRethrowError([
                  `writePreference(${set}, ${name}, ${value})`,
                  "localForge.storePreference",
                  "s3.storePreference"
                ])
              )
          )
      );
  }

  readPreferenceData(set) {
    return this.localForge
      .fetchPreference(set)
      .catch(
        logAndRethrowError([
          `readPreferenceData(${set})`,
          "localForge.fetchPreference"
        ])
      )
      .catch(() =>
        this.s3
          .fetchPreference(set)
          .catch(
            logAndRethrowError([
              `readPreferenceData(${set})`,
              "localForge.fetchPreference",
              "s3.fetchPreference"
            ])
          )
          .then(preferenceData =>
            this.localForge
              .storePreference(set, preferenceData)
              .catch(
                logAndRethrowError([
                  `readPreferenceData(${set})`,
                  "localForge.fetchPreference",
                  "s3.fetchPreference",
                  "localForge.storePreference"
                ])
              )
              .then(constant(preferenceData))
          )
      );
  }

  readLocalPreferenceData(set) {
    return this.localForge
      .fetchPreference(set)
      .catch(
        logAndRethrowError([
          `readLocalPreferenceData(${set})`,
          "localForge.fetchPreference"
        ])
      );
  }
}

let DefaultInstance = null;

export const getMultiLevelPreferenceCacheService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new MultiLevelPreferenceCacheService();
  }
  return DefaultInstance;
};
