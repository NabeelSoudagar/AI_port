import React from 'react';

import Marquee from 'react-fast-marquee';

interface SkillsProps {
    skills?: { name: string; keywords: string[] }[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <section id="skills">
            <h2 style={{ textAlign: 'center' }}>Tech <span className="gradient-text">Stack</span></h2>
            
            <Marquee speed={40} gradient={false} style={{ marginTop: '3rem', padding: '1rem 0', overflow: 'hidden' }}>
                {skills?.flatMap(c => c.keywords).map((skill, i) => (
                    <div key={i} className="glass" style={{ margin: '0 1rem', padding: '1rem 2rem', fontWeight: 'bold' }}>
                        {skill}
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default Skills;
