import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- BorderBeam Component ---
export const BorderBeam = ({
    className,
    size = 200,
    duration = 15,
    borderWidth = 1.5,
    colorFrom = "rgba(255, 255, 255, 0)",
    colorVia = "rgba(255, 255, 255, 0.5)",
    colorTo = "rgba(255, 255, 255, 0)",
    delay = 0,
}: {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorVia?: string;
    colorTo?: string;
    delay?: number;
}) => {
    return (
        <div
            style={
                {
                    "--size": `${size}px`,
                    "--duration": `${duration}s`,
                    "--border-width": `${borderWidth}px`,
                    "--color-from": colorFrom,
                    "--color-via": colorVia,
                    "--color-to": colorTo,
                    "--delay": `-${delay}s`,
                } as React.CSSProperties
            }
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent]",
                "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
                "after:absolute after:aspect-square after:w-[var(--size)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-via),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)*50%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*50%))]",
                className,
            )}
        />
    );
};

// --- ProgressiveBlur Component ---
export const ProgressiveBlur = ({
    height = "80px",
    position = "bottom",
    className,
}: {
    height?: string;
    position?: "top" | "bottom";
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "absolute left-0 right-0 z-10 pointer-events-none",
                position === "top" ? "top-0" : "bottom-0",
                className
            )}
            style={{
                height,
                background: `linear-gradient(${position === "top" ? "to bottom" : "to top"}, #0a0a0a 0%, rgba(10, 10, 10, 0.8) 20%, rgba(10, 10, 10, 0) 100%)`,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                maskImage: `linear-gradient(${position === "top" ? "to bottom" : "to top"}, black 0%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(${position === "top" ? "to bottom" : "to top"}, black 0%, transparent 100%)`,
            }}
        />
    );
};

// --- GlareCard Effect ---
export const GlareCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;

        setRotate({
            x: ((py - 50) / 50) * -2,
            y: ((px - 50) / 50) * 3,
        });
        setGlare({ x: px, y: py, opacity: 0.15 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setGlare(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative rounded-xl transition-all duration-200 ease-out preserve-3d",
                className
            )}
            style={{
                transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            }}
        >
            {children}
            <div
                className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
                style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,${glare.opacity * 0.3}) 40%, rgba(255,255,255,0) 70%)`,
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
};

// --- Staggered Reveal Wrapper ---
export const StaggeredReveal = ({
    children,
    delay = 0,
    index = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    index?: number;
    className?: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: delay + index * 0.05,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- Animated Counter ---
export const AnimatedCounter = ({
    value,
    className,
    duration = 1000
}: {
    value: number;
    className?: string;
    duration?: number;
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span className={className}>{count.toLocaleString()}</span>;
};
