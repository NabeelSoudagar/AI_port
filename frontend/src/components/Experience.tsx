import React from 'react';

interface ExperienceProps {
    work?: {
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        summary: string;
    }[];
}

const Experience: React.FC<ExperienceProps> = ({ work }) => {
    return (
        <section id="experience">
            <h2 style={{ textAlign: 'center' }}>Professional <span className="gradient-text">Journey</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                {work?.map((exp, i) => (
                    <div key={i} className="glass" style={{ padding: '2rem', transition: 'all 0.3s ease' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{exp.position}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: '600' }}>{exp.company}</span>
                            <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p style={{ color: 'var(--text-dim)' }}>{exp.summary}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
