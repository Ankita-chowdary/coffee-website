'use client';

import { useRef, useEffect, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface ScrollyCanvasProps {
    folderPath: string;
    scrollProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ folderPath, scrollProgress }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const frameCount = 192; // Updated to match asset count

    // Preload Images
    useEffect(() => {
        setIsLoaded(false);
        setImages([]);
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImages = async () => {
            // Clear previous images to help GC
            setImages([]);

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                // Assuming format is 1.jpg, 2.jpg...
                img.src = `${folderPath}/${i}.jpg`;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === frameCount) {
                        setIsLoaded(true);
                    }
                };
                loadedImages[i - 1] = img;
            }
            setImages(loadedImages);
        };

        loadImages();

        return () => {
            // Cleanup for memory leaks
            setImages([]);
        };
    }, [folderPath]);

    // Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = (index: number) => {
            const img = images[index];
            if (!img) return;

            // High-DPI handling
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Object-fit: contain logic
            const scale = Math.min(width / img.width, height / img.height);
            const x = (width / 2) - (img.width / 2) * scale;
            const y = (height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // Initial render
        render(0);

        // Subscribe to scroll changes
        const unsubscribe = scrollProgress.on('change', (latest) => {
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(latest * frameCount)
            );
            requestAnimationFrame(() => render(frameIndex));
        });

        return () => unsubscribe();
    }, [folderPath, isLoaded, images, scrollProgress]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
        />
    );
}
