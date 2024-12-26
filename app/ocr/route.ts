import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

interface TesseractLogger {
  status: string;
  progress: number;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image');

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'No image provided or invalid file type' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await Tesseract.recognize(buffer, 'spa', {
      logger: (m: TesseractLogger) => console.log(m),
    });

    return NextResponse.json({ text: result.data.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing image', details: (error as Error).message }, { status: 500 });
  }
}