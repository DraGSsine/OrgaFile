"use server";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getPresignedUrl(key: string) {
  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
  return url;
}

export async function getS3SignedUrl(
  fileKey: string,
  fileType: string,
  fileSize: number
): Promise<{ success: boolean; url: string }> {
  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
      ContentLength: fileSize,
    });
    const url = await getSignedUrl(s3, uploadCommand, { expiresIn: 60 });
    return { success: true, url };
  } catch (error) {
    console.error("Error getting signed URL", error);
    return { success: false, url: "" };
  }
}

export async function generateFileUrl(fileKey: string) {
  return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
}
