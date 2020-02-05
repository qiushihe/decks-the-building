import Promise from "bluebird";
import { Config, Credentials, S3 } from "aws-sdk";
import flow from "lodash/fp/flow";
import trim from "lodash/fp/trim";
import split from "lodash/fp/split";
import size from "lodash/fp/size";

class S3Client {
  constructor() {
    this.s3 = null;
  }

  isLoggedIn() {
    return Promise.resolve(this.s3 !== null);
  }

  setLogin(login) {
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
    } else {
      this.s3 = null;
    }

    return Promise.resolve();
  }

  uploadJson(path, data) {
    return new Promise((resolve, reject) => {
      this.s3.upload(
        {
          Bucket: this.bucketName,
          Key: path,
          Body: JSON.stringify(data, null, 2),
          ContentType: "text/plain"
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

  downloadJson(path) {
    return new Promise((resolve, reject) => {
      this.s3.getObject(
        {
          Bucket: this.bucketName,
          Key: path,
          ResponseContentType: "text/plain",
          ResponseContentDisposition: "inline"
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
