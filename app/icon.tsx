import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#dc2626',
                    borderRadius: '50%',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: 'white',
                    fontStyle: 'italic',
                }}
            >
                M
            </div>
        ),
        { ...size }
    );
}
