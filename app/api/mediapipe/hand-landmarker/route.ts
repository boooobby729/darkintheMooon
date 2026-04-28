export const dynamic = 'force-dynamic';

const REMOTE_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

export async function GET() {
  try {
    const res = await fetch(REMOTE_MODEL_URL, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return new Response('Failed to fetch remote model', { status: 502 });
    }
    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch (e) {
    return new Response('Model proxy error', { status: 500 });
  }
}
