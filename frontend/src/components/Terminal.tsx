import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
    const [history, setHistory] = useState([
        { type: 'system', text: 'Welcome to PortfoliAI OS v1.0.0' },
        { type: 'system', text: 'Type "help" for a list of commands.' }
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        let response = '';

        switch (trimmed) {
            case 'help':
                response = 'Available commands: whoami, skills, clear';
                break;
            case 'whoami':
                response = 'Nabeel Soudagar - Full Stack Developer';
                break;
            case 'skills':
                response = 'React.js, Node.js, Express, PostgreSQL, Supabase, TypeScript';
                break;
            case 'clear':
                setHistory([]);
                return;
            case '':
                break;
            default:
                response = `Command not found: ${trimmed}`;
        }

        if (trimmed) {
            setHistory(prev => [
                ...prev,
                { type: 'user', text: `> ${cmd}` },
                ...(response ? [{ type: 'system', text: response }] : [])
            ]);
        }
        setInput('');
    };

    return (
        <div className="glass terminal-playground" style={{
            fontFamily: 'monospace',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1.5rem',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '450px',
            height: '250px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--primary)',
            boxShadow: '0 0 20px rgba(0, 210, 255, 0.1)',
            cursor: 'text'
        }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                {history.map((line, i) => (
                    <div key={i} style={{ color: line.type === 'system' ? '#a5d6ff' : '#7ee787' }}>
                        {line.text}
                    </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', color: '#7ee787' }}>
                    <span>{'>'}</span>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCommand(input);
                        }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'inherit',
                            outline: 'none',
                            fontFamily: 'inherit',
                            flex: 1,
                            fontSize: '0.9rem'
                        }}
                    />
                </div>
                <div ref={endRef} />
            </div>
        </div>
    );
};

export default Terminal;
