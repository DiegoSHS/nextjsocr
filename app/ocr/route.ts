import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

interface TesseractLogger {
  status: string;
  progress: number;
}

export async function POST(req: NextRequest) {
  const { image }: { image: string } = await req.json();
  try {
    const result = await Tesseract.recognize(image, 'spa', {
      logger: (m: TesseractLogger) => console.log(m),
    });

    return NextResponse.json({ text: result.data.text });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Error processing image', details: (error as Error).message }, { status: 500 });
  }
}