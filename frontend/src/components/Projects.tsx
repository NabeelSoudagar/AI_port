import React from 'react';

interface ProjectsProps {
    projects?: {
        name: string;
        description: string;
        url: string;
    }[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <section id="projects">
            <h2 style={{ textAlign: 'center' }}>Featured <span className="gradient-text">Projects</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                {projects?.map((project, i) => (
                    <div key={i} className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ color: 'var(--secondary)' }}>{project.name}</h3>
                            <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>{project.description}</p>
                        </div>
                        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}>
                            View Project →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
