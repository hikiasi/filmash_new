import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

export async function uploadImage(
  file: File,
  brandId: string,
  modelId: string,
  trimId: string,
  type: 'colors' | 'wheels' | 'interiors'
) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}.webp`;

  const relativePath = `uploads/cars/${brandId}/${modelId}/${trimId}/${type}`;
  const uploadDir = path.join(process.cwd(), 'public', relativePath);

  // Create directory if it doesn't exist
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);

  // Process and optimize image
  await sharp(buffer)
    .webp({ quality: 85 })
    .toFile(filePath);

  // Optional: Create thumbnail
  const thumbFilename = `thumb_${filename}`;
  const thumbPath = path.join(uploadDir, thumbFilename);
  await sharp(buffer)
    .resize(300, 200)
    .webp({ quality: 80 })
    .toFile(thumbPath);

  return {
    url: `/${relativePath}/${filename}`,
    thumbUrl: `/${relativePath}/${thumbFilename}`,
    path: filePath
  };
}
