'use client';

import { useEffect } from 'react';
import { useCamera } from '@/hooks/useCamera';

export default function HomePage() {
  const { photoUrl, isLoading, error, takePhoto, clearPhoto } = useCamera();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 safe-bottom">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Selfie Take Test</h1>
      <p className="text-sm text-gray-500 mb-8">Take a selfie for your profile photo</p>

      <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg border-4 border-white mb-8">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile photo"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-20 h-20 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={takePhoto}
          disabled={isLoading}
          aria-label="Take profile photo"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150"
        >
          {isLoading ? (
            <span className="inline-flex items-center justify-center">
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Taking...
            </span>
          ) : (
            'Take profile photo'
          )}
        </button>

        {photoUrl && (
          <button
            onClick={clearPhoto}
            aria-label="Remove photo"
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-[0.98] active:bg-gray-300 transition-all duration-150"
          >
            Remove photo
          </button>
        )}
      </div>
    </main>
  );
}
