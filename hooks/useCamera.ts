'use client';

import { useState, useCallback } from 'react';
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraDirection,
} from '@capacitor/camera';

const isBrowser = typeof window !== 'undefined';

const CAMERA_OPTIONS = {
  quality: 90,
  resultType: CameraResultType.Uri,
  source: CameraSource.Camera,
  direction: CameraDirection.Front,
  saveToGallery: false,
} as const;

const ERROR_MESSAGES = {
  CANCELLED: 'Cancelled',
  PERMISSION_DENIED: 'No camera access',
  GENERIC: 'Camera error',
} as const;

interface UseCameraResult {
  photoUrl: string | null;
  isLoading: boolean;
  error: string | null;
  takePhoto: () => Promise<void>;
  clearPhoto: () => void;
}

export function useCamera(): UseCameraResult {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = useCallback(async () => {
    if (!isBrowser) return;

    setIsLoading(true);
    setError(null);

    try {
      const permissions = await Camera.checkPermissions();

      if (permissions.camera !== 'granted') {
        const requested = await Camera.requestPermissions();
        if (requested.camera === 'denied') {
          throw new Error('permission_denied');
        }
      }

      const photo = await Camera.getPhoto(CAMERA_OPTIONS);

      if (photo.webPath) {
        setPhotoUrl(photo.webPath);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';

      if (message.includes('cancel') || message.includes('Cancel')) {
        setError(ERROR_MESSAGES.CANCELLED);
      } else if (message === 'permission_denied' || message.includes('permission')) {
        setError(ERROR_MESSAGES.PERMISSION_DENIED);
      } else {
        setError(ERROR_MESSAGES.GENERIC);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearPhoto = useCallback(() => {
    setPhotoUrl(null);
    setError(null);
  }, []);

  return { photoUrl, isLoading, error, takePhoto, clearPhoto };
}
