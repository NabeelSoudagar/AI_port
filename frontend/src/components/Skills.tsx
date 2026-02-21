import React from 'react';

interface SkillsProps {
    skills?: { name: string; keywords: string[] }[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <section id="skills">
            <h2 style={{ textAlign: 'center' }}>Tech <span className="gradient-text">Stack</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                {skills?.map((category, i) => (
                    <div key={i} className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ color: 'var(--primary)' }}>{category.name}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                            {category.keywords.map((skill, j) => (
                                <span key={j} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
