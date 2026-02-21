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
                {work?.map((item, i) => (
                    <div key={i} className="glass" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ color: 'var(--primary)', margin: 0 }}>{item.position}</h3>
                            <span style={{ color: 'var(--text-dim)' }}>{item.startDate} — {item.endDate}</span>
                        </div>
                        <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>{item.company}</h4>
                        <p style={{ color: 'var(--text-dim)' }}>{item.summary}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
