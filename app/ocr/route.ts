import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  try {
    const result = await Tesseract.recognize(image, 'spa', {
      logger: (m: any) => console.log(m),
    });

    return NextResponse.json({ text: result.data.text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing image', details: error.message }, { status: 500 });
  }
}