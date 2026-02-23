import React, { useRef, useState } from 'react';

interface ProjectsProps {
    projects?: {
        name: string;
        description: string;
        url: string;
    }[];
}

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass"
            style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                perspective: '1000px',
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
                transformStyle: 'preserve-3d'
            }}
        >
            <div style={{ transform: 'translateZ(20px)' }}>
                <h3 style={{ color: 'var(--secondary)' }}>{project.name}</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>{project.description}</p>
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                color: 'var(--primary)',
                textDecoration: 'none',
                fontWeight: '600',
                transform: 'translateZ(30px)'
            }}>
                View Project →
            </a>
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <section id="projects">
            <h2 style={{ textAlign: 'center' }}>Featured <span className="gradient-text">Projects</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                {projects?.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
