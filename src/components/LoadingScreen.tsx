import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`loading-screen ${isExiting ? 'loading-exit' : ''}`}>
      <div className="loading-content">
        <img src="/NewLogo1.png" alt="Tiki Taco Cruises" className="loading-logo" />
      </div>
      <div className="loading-wave" />
      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          background: #1a2332;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transform: translateY(0);
          transition: transform 0.4s ease-in;
        }

        .loading-exit {
          transform: translateY(-100%);
        }

        .loading-content {
          position: relative;
          z-index: 2;
          animation: logoFadeScale 1s ease-out forwards;
        }

        .loading-logo {
          width: min(280px, 70vw);
          height: auto;
          opacity: 0;
        }

        .loading-wave {
          position: absolute;
          bottom: -20px;
          left: 0;
          width: 200%;
          height: 140px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          animation: waveMove 4s ease-in-out infinite;
        }

        @keyframes logoFadeScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes waveMove {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </div>
  );
}
