import Promise from "bluebird";
import { Config, Credentials, S3 } from "aws-sdk";

class S3Client {
  constructor({ login }) {
    const parts = (login || "").split("@");
    this.bucketName = parts[3] || "";

    const config = new Config({
      region: parts[2] || "",
      credentials: new Credentials({
        accessKeyId: parts[0] || "",
        secretAccessKey: parts[1] || ""
      })
    });

    this.s3 = new S3(config);

    console.log("S3Client", this);
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

export const getS3Client = ({ login }) => {
  if (s3ClientInstance === null) {
    s3ClientInstance = new S3Client({ login });
  }
  return s3ClientInstance;
};
