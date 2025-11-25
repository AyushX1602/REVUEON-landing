import React, { useRef, useId, useEffect, useMemo, useCallback, memo } from 'react';

// Optimized SparklesCore component with performance improvements
export const SparklesCore = memo(({
    sizing = 'fill',
    color = '#D1DFF3',
    animation = { scale: 50, speed: 50 },
    noise = { opacity: 0.3, scale: 1 },
    style = {},
    className = '',
    children
}) => {
    const id = useId().replace(/:/g, "");
    const instanceId = `shadowoverlay-${id}`;
    const feColorMatrixRef = useRef(null);
    const animationIdRef = useRef(null);
    const startTimeRef = useRef(null);
    
    // Memoize animation state and calculations
    const animationEnabled = useMemo(() => animation && animation.scale > 0, [animation?.scale]);
    
    // Helper function to map ranges - memoized for performance
    const mapRange = useCallback((value, fromLow, fromHigh, toLow, toHigh) => {
        if (fromLow === fromHigh) return toLow;
        const percentage = (value - fromLow) / (fromHigh - fromLow);
        return toLow + percentage * (toHigh - toLow);
    }, []);

    // Memoize expensive calculations
    const { displacementScale, animationDuration, baseFrequencyX, baseFrequencyY } = useMemo(() => {
        if (!animation) return { displacementScale: 0, animationDuration: 1, baseFrequencyX: 0.001, baseFrequencyY: 0.004 };
        
        return {
            displacementScale: mapRange(animation.scale, 1, 100, 20, 100),
            animationDuration: mapRange(animation.speed, 1, 100, 1000, 50),
            baseFrequencyX: mapRange(animation.scale, 0, 100, 0.001, 0.0005),
            baseFrequencyY: mapRange(animation.scale, 0, 100, 0.004, 0.002)
        };
    }, [animation?.scale, animation?.speed, mapRange]);

    // Memoize filter styles to prevent unnecessary re-renders
    const filterStyles = useMemo(() => ({
        position: "absolute",
        inset: -displacementScale,
        filter: animationEnabled ? `url(#${instanceId}) blur(4px)` : "none",
        willChange: animationEnabled ? "filter" : "auto"
    }), [displacementScale, animationEnabled, instanceId]);

    // Memoize mask styles
    const maskStyles = useMemo(() => ({
        backgroundColor: color,
        // maskImage: `url('/assets/images/sparkles/sparkles-mask.png')`, // Replaced with gradient
        maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
        maskSize: sizing === "stretch" ? "100% 100%" : "cover",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        width: "100%",
        height: "100%",
        willChange: "background-color"
    }), [color, sizing]);

    // Memoize noise styles
    const noiseStyles = useMemo(() => {
        if (!noise || noise.opacity <= 0) return null;
        return {
            position: "absolute",
            inset: 0,
            // backgroundImage: `url("/assets/images/sparkles/noise-texture.png")`, // Removed external dependency
            opacity: noise.opacity / 2
        };
    }, [noise?.opacity, noise?.scale]);

    // Optimized animation function with throttling
    const animate = useCallback((timestamp) => {
        if (!feColorMatrixRef.current) return;
        
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = (elapsed / (animationDuration * 10)) % 1;
        const hueValue = Math.round(progress * 360); // Round to avoid micro-updates
        
        // Only update if value actually changed (performance optimization)
        const currentValue = feColorMatrixRef.current.getAttribute("values");
        if (currentValue !== String(hueValue)) {
            feColorMatrixRef.current.setAttribute("values", String(hueValue));
        }
        
        animationIdRef.current = requestAnimationFrame(animate);
    }, [animationDuration]);

    // Effect with proper cleanup and dependency optimization
    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled) {
            startTimeRef.current = null;
            animationIdRef.current = requestAnimationFrame(animate);
            
            return () => {
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                }
            };
        }
    }, [animationEnabled, animate]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            {/* SVG Filter Definition */}
            <svg className="absolute w-0 h-0">
                <filter id={instanceId}>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency={`${baseFrequencyX} ${baseFrequencyY}`}
                        numOctaves="1"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={displacementScale}
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                    <feColorMatrix
                        ref={feColorMatrixRef}
                        type="hueRotate"
                        values="0"
                    />
                </filter>
            </svg>

            {/* Sparkles Layer */}
            <div style={filterStyles}>
                <div style={maskStyles} />
            </div>

            {/* Noise Overlay */}
            {noiseStyles && <div style={noiseStyles} />}
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
});
