import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: '1rem',
            margin: '1rem 2rem',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                PortfoliAI
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
                {['Home', 'Skills', 'Experience', 'Projects'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="nav-link"
                        style={{
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
