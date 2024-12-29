import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

export async function POST(req: NextRequest) {
  const { image }: { image: string } = await req.json();
  try {
    const imageBuffer = Buffer.from(image, 'base64');
    const worker = await createWorker('spa', 1, {
      workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js"
    });
    const result = await worker.recognize(imageBuffer);
    await worker.terminate();
    return NextResponse.json({ text: result.data.text });
  } catch (error) {
    console.error('Error processing image:');
    return NextResponse.json({ error: 'Error processing image', text: (error as Error).message }, { status: 500 });
  }
}