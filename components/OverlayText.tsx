'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface OverlayTextProps {
    text: string;
    triggerPercent: number; // The point where this text is "focused" (0 to 1)
    scrollProgress: MotionValue<number>;
}

export default function OverlayText({ text, triggerPercent, scrollProgress }: OverlayTextProps) {
    // Define animation ranges
    // Text fades in slightly before the trigger, peaks at trigger, and fades out after
    const start = Math.max(0, triggerPercent - 0.1);
    const end = Math.min(1, triggerPercent + 0.1);

    const opacity = useTransform(
        scrollProgress,
        [start, triggerPercent, end],
        [0, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [start, triggerPercent, end],
        [50, 0, -50]
    );

    const blur = useTransform(
        scrollProgress,
        [start, triggerPercent, end],
        ['10px', '0px', '10px']
    );

    return (
        <motion.div
            style={{ opacity, y, filter: `blur(${blur})` as any }} // Type casting for filter with motion value
            className="fixed top-1/2 left-0 w-full text-center pointer-events-none z-10 px-4"
        >
            <h2 className="text-4xl md:text-6xl font-serif text-brand-gold tracking-wide drop-shadow-lg">
                {text}
            </h2>
        </motion.div>
    );
}
