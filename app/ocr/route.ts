import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

interface TesseractLogger {
  status: string;
  progress: number;
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data)
  if (!data.image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  try {
    const result = await Tesseract.recognize(data.image, 'spa', {
      logger: (m: TesseractLogger) => console.log(m),
    });

    return NextResponse.json({ text: result.data.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing image', details: (error as Error).message }, { status: 500 });
  }
}