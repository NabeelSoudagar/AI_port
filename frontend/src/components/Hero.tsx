import React from 'react';
import Magnetic from './Magnetic.tsx';

interface HeroProps {
    basics?: {
        name: string;
        label: string;
        summary: string;
        profiles?: {
            network: string;
            url: string;
        }[];
    };
}

const Hero: React.FC<HeroProps> = ({ basics }) => {
    return (
        <section id="home" className="animate-fade hero-container" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '70vh',
            gap: '4rem',
            padding: '4rem 0',
            flexWrap: 'wrap'
        }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                    Hi, I'm <span className="gradient-text">{basics?.name || 'Loading...'}</span>
                </h1>
                <h2 style={{ fontSize: '2rem', color: 'var(--text-dim)', marginBottom: '2rem' }}>
                    {basics?.label}
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '1.5rem', maxWidth: '600px' }}>
                    {basics?.summary}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }} className="hero-buttons">
                    {basics?.profiles?.map((profile, i) => (
                        <Magnetic key={i} strength={0.3}>
                            <a
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'var(--text-main)',
                                    textDecoration: 'none',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    transition: 'all 0.3s ease'
                                }}
                                className="nav-link"
                            >
                                {profile.network} ↗
                            </a>
                        </Magnetic>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }} className="hero-buttons">
                    <Magnetic strength={0.2}>
                        <a href="/resume_nabeel_soudagar.pdf" download="Nabeel_Soudagar_Resume.pdf" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            <button className="glass" style={{ padding: '1rem 2.5rem', background: 'var(--primary)', color: 'white', fontWeight: '600' }}>
                                Download Resume
                            </button>
                        </a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                        <button className="glass" style={{ padding: '1rem 2.5rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
                            View Projects
                        </button>
                    </Magnetic>
                </div>
            </div>

            <div className="float hero-image-container" style={{
                flex: '0 0 400px',
                height: '400px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="glass" style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    overflow: 'hidden',
                    border: '4px solid var(--primary)',
                    boxShadow: '0 0 40px rgba(0, 210, 255, 0.3)',
                    animation: 'morph 8s ease-in-out infinite'
                }}>
                    <img
                        src="/profile.jpeg"
                        alt={basics?.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Your+Photo';
                        }}
                    />
                </div>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute', top: '-10%', right: '-10%',
                    width: '100px', height: '100px', borderRadius: '50%',
                    background: 'var(--secondary)', filter: 'blur(50px)', opacity: 0.5
                }}></div>
            </div>

            <style>{`
                @keyframes morph {
                    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                    50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
                    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
