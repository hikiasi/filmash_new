import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/utils/image-upload';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const brandId = formData.get('brandId') as string;
    const modelId = formData.get('modelId') as string;
    const trimId = formData.get('trimId') as string;
    const type = formData.get('type') as 'colors' | 'wheels' | 'interiors';

    if (!file || !brandId || !modelId || !trimId || !type) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        return new NextResponse('File must be an image', { status: 400 });
    }

    // Validate size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return new NextResponse('File too large (max 5MB)', { status: 400 });
    }

    const result = await uploadImage(file, brandId, modelId, trimId, type);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[UPLOAD_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
