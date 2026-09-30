import React, { useState, useEffect } from 'react';
import Magnetic from './Magnetic.tsx';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className="glass navbar-container" style={{
            position: 'sticky',
            top: '1rem',
            margin: '1rem 2rem',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    PortfoliAI
                </div>
                {/* Available for work indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(39, 201, 63, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid rgba(39, 201, 63, 0.2)' }}>
                    <div className="status-dot"></div>
                    <span style={{ fontSize: '0.8rem', color: '#27c93f', fontWeight: '600' }}>Available for Work</span>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="navbar-links">
                {['Home', 'Skills', 'Experience', 'Projects'].map((item) => (
                    <Magnetic key={item} strength={0.3}>
                        <a
                            href={`#${item.toLowerCase()}`}
                            className="nav-link"
                            style={{
                                color: 'var(--text-main)',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                display: 'inline-block'
                            }}
                        >
                            {item}
                        </a>
                    </Magnetic>
                ))}
                
                {/* Theme Toggle */}
                <Magnetic strength={0.2}>
                    <button onClick={toggleTheme} style={{ background: 'transparent', padding: '0.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </Magnetic>
            </div>
        </nav>
    );
};

export default Navbar;
