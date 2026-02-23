import React, { useState, useRef, useEffect } from 'react';

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        "What are his strongest skills?",
        "Does he know React?",
        "Show backend projects",
        "Why should we hire him?"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleSend = async (customMessage?: string) => {
        const textToSend = customMessage || message;
        if (!textToSend.trim()) return;

        const userMsg = { role: 'user', content: textToSend };
        setHistory(prev => [...prev, userMsg]);
        if (!customMessage) setMessage('');
        setLoading(true);

        try {
            const res = await fetch('https://ai-port.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: textToSend, history })
            });

            const data = await res.json();

            if (!res.ok) {
                setHistory(prev => [...prev, { role: 'assistant', content: `AI Error: ${data.detail || 'The server encountered an issue.'}` }]);
            } else {
                setHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
            }
        } catch (err) {
            setHistory(prev => [...prev, { role: 'assistant', content: "Error connecting to AI. Is the backend running?" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000, display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
            {isOpen && (
                <div className="glass chatbot-suggestions-panel" style={{
                    width: '200px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--primary)' }}>Ask me:</span>
                    {suggestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(q)}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                fontSize: '0.8rem',
                                textAlign: 'left',
                                color: 'var(--text-dim)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'var(--text-main)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.color = 'var(--text-dim)';
                            }}
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {isOpen ? (
                <div className="glass chatbot-window" style={{ width: '350px', height: '500px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Chat with my Resume AI</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', color: 'var(--text-main)', fontSize: '1.2rem' }}>×</button>
                    </div>

                    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {history.map((msg, i) => (
                            <div key={i} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.role === 'user' ? 'var(--secondary)' : 'rgba(255,255,255,0.1)',
                                padding: '0.8rem',
                                borderRadius: '12px',
                                maxWidth: '80%',
                                fontSize: '0.9rem'
                            }}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>AI is thinking...</div>}
                    </div>

                    <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.5rem', color: 'white' }}
                        />
                        <button onClick={() => handleSend()} style={{ background: 'var(--primary)', padding: '0.5rem 1rem' }}>Send</button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                        color: 'white', fontSize: '1.8rem', boxShadow: '0 5px 15px rgba(0,210,255,0.4)',
                        cursor: 'pointer'
                    }}
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default ChatBot;
