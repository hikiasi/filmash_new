import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'misc';

    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    const isImage = file.type.startsWith('image/');
    let filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;

    if (isImage && !file.name.endsWith('.svg')) {
      // Optimize image
      buffer = await sharp(buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      // Change extension to .webp
      filename = filename.replace(/\.[^/.]+$/, "") + ".webp";
    }

    const relativePath = `/uploads/${folder}/${filename}`;
    const absolutePath = join(process.cwd(), 'public', 'uploads', folder, filename);

    // Ensure directory exists
    await mkdir(join(process.cwd(), 'public', 'uploads', folder), { recursive: true });

    await writeFile(absolutePath, buffer);

    return NextResponse.json({ url: relativePath });
  } catch (error) {
    console.error('[UPLOAD_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
