import Promise from "bluebird";
import { Config, Credentials, S3 } from "aws-sdk";
import flow from "lodash/fp/flow";
import trim from "lodash/fp/trim";
import split from "lodash/fp/split";
import size from "lodash/fp/size";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";

class S3Client {
  constructor() {
    this.s3 = null;
  }

  setLogin(login) {
    return new Promise((resolve, reject) => {
      const parts = flow([trim, split("@")])(login);

      if (size(parts) === 4) {
        this.bucketName = parts[3] || "";
        this.s3 = new S3(
          new Config({
            region: parts[2] || "",
            credentials: new Credentials({
              accessKeyId: parts[0] || "",
              secretAccessKey: parts[1] || ""
            })
          })
        );
        resolve();
      } else {
        this.s3 = null;
        reject(new Error("invalid S3 login"));
      }
    });
  }

  storeCardCatalog(name, version, data) {
    return this.storeById("catalog", `${name}-${version}`, data);
  }

  fetchCardCatalog(name, version) {
    return this.fetchById("catalog", `${name}-${version}`);
  }

  storeCardById(version, id, data) {
    return this.storeById(`cards-${version}`, id, data);
  }

  fetchCardById(version, id) {
    return this.fetchById(`cards-${version}`, id);
  }

  storeWorkspaceById(id, data) {
    return this.storeById("workspaces", id, data);
  }

  fetchWorkspaceById(id) {
    return this.fetchById("workspaces", id);
  }

  fetchAllWorkspaceIds() {
    if (this.s3 === null) {
      return Promise.reject(new Error("S3 client not logged in"));
    }

    return new Promise((resolve, reject) => {
      this.s3.listObjects(
        {
          Bucket: this.bucketName,
          Prefix: "workspaces/"
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            flow([
              get("Contents"),
              map(get("Key")),
              map(key => {
                const matchedKey = key.match(/^workspaces\/([^/.]+)\..*$/);
                return matchedKey ? matchedKey[1] : null;
              }),
              compact,
              uniq,
              resolve
            ])(data);
          }
        }
      );
    });
  }

  storeById(subDirectory, id, data) {
    if (this.s3 === null) {
      return Promise.reject(new Error("S3 client not logged in"));
    }

    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: this.bucketName,
          Key: `${subDirectory}/${id}.json`,
          Body: JSON.stringify(data, null, 2),
          ContentType: "text/plain",
          CacheControl: "no-cache"
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  fetchById(subDirectory, id) {
    if (this.s3 === null) {
      return Promise.reject(new Error("S3 client not logged in"));
    }

    return new Promise((resolve, reject) => {
      this.s3.getObject(
        {
          Bucket: this.bucketName,
          Key: `${subDirectory}/${id}.json`,
          ResponseContentType: "text/plain",
          ResponseContentDisposition: "inline",
          ResponseCacheControl: "no-cache"
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            try {
              resolve(JSON.parse(new TextDecoder("utf-8").decode(data.Body)));
            } catch (err) {
              reject(err);
            }
          }
        }
      );
    });
  }
}

let s3ClientInstance = null;

export const getS3Client = () => {
  if (s3ClientInstance === null) {
    s3ClientInstance = new S3Client();
  }
  return s3ClientInstance;
};
