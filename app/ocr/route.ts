import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

export async function POST(req: NextRequest) {
  const { image }: { image: string } = await req.json();
  try {
    const worker = await Tesseract.createWorker();
    const result = await worker.recognize(image);

    return NextResponse.json({ text: result.data.text });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Error processing image', details: (error as Error).message }, { status: 500 });
  }
}