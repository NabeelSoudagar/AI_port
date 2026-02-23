import React, { useRef, useState, useEffect, type ReactElement } from 'react';

interface MagneticProps {
    children: ReactElement;
    strength?: number;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5 }) => {
    const ref = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = (clientX - centerX) * strength;
        const deltaY = (clientY - centerY) * strength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener('mousemove', handleMouseMove);
            node.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                node.removeEventListener('mousemove', handleMouseMove);
                node.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return React.cloneElement(children, {
        ref,
        style: {
            ...(children.props as any).style,
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
        },
    } as any);
};

export default Magnetic;
