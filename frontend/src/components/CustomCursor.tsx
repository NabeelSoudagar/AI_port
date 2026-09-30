import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Hide default cursor for body
        document.body.style.cursor = 'none';
        
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, input, textarea, .glass, .nav-link')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            backgroundColor: 'transparent',
            border: '2px solid var(--primary)',
            mixBlendMode: 'normal' as any
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: 'var(--text-main)',
            border: 'none',
            mixBlendMode: 'difference' as any
        }
    };

    // Do not show on mobile/touch devices
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CustomCursor;
