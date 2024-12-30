import { s3 } from "../conf/aws.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getPresignedUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: key,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log("url from aws",url);
  return url;
}
