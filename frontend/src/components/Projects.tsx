import React from 'react';

interface ProjectsProps {
    projects?: {
        name: string;
        description: string;
        url: string;
    }[];
}

import Tilt from 'react-parallax-tilt';

const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.02}
            transitionSpeed={2500}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            className="glass"
            style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
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
                transform: 'translateZ(30px)',
                display: 'inline-block'
            }}>
                View Project →
            </a>
        </Tilt>
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
