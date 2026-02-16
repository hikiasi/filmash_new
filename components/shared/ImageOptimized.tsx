'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageOptimizedProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc?: string;
  imgClassName?: string;
}

export const ImageOptimized = ({
  src,
  alt,
  className,
  imgClassName,
  fallbackSrc = '/placeholder-car.jpg',
  ...props
}: ImageOptimizedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
          imgClassName
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-900/20 animate-pulse" />
      )}
    </div>
  );
};

export default ImageOptimized;
