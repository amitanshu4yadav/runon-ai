import { ImageResponse } from 'next/og';

export const alt = 'Runon AI — AI agents that actually get work done';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #07070c 0%, #1a1033 60%, #0b2a33 100%)',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 44, fontWeight: 700, display: 'flex' }}>Runon AI</div>
        </div>
        <div style={{ fontSize: 86, fontWeight: 800, marginTop: 48, lineHeight: 1.05, display: 'flex' }}>
          AI agents that actually get work done
        </div>
        <div style={{ fontSize: 32, marginTop: 28, color: '#b9b9cc', display: 'flex' }}>
          Research, writing, analysis and building — in one workspace.
        </div>
      </div>
    ),
    size,
  );
}
