'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Can Areeb build a 3D product viewer?',
  'Does he know Angular and TypeScript?',
  'Can he build a canvas-based editor?',
  'Is he available for remote freelance?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // GSAP open/close animation
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      panel.style.display = 'flex';
      gsap.fromTo(panel,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
      );
    } else {
      gsap.to(panel, {
        opacity: 0, y: 20, scale: 0.95, duration: 0.25, ease: 'power3.in',
        onComplete: () => { panel.style.display = 'none'; },
      });
    }
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: messages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error ?? 'Something went wrong. Email iareebafzal1122@gmail.com directly.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Email iareebafzal1122@gmail.com directly.' }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-16 right-0 mb-2 flex w-[380px] flex-col overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] shadow-2xl"
        style={{ display: 'none', height: 520 }}
      >
        {/* Header */}
        <div className="shrink-0 border-b border-[#1e1e1e] px-5 py-4">
          <h3 className="font-display text-lg tracking-wider text-foreground">
            CAN AREEB BUILD IT?
          </h3>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Describe your project idea
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col gap-2">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                Try asking:
              </p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-lg border border-[#1e1e1e] bg-surface px-3 py-2 text-left font-mono text-xs text-foreground/70 transition-all hover:border-accent/30 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-surface text-foreground/90'
                    : 'border-l-2 border-accent/40 bg-[#0a1a10] text-foreground/80'
                }`}
              >
                {msg.role === 'assistant' && (
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-accent/60">
                    Assistant
                  </span>
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="mb-3 flex justify-start">
              <div className="flex items-center gap-1.5 rounded-xl border-l-2 border-accent/40 bg-[#0a1a10] px-4 py-3">
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '0ms' }} />
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '150ms' }} />
                <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-accent" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-[#1e1e1e] px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(input); }}
              placeholder="Describe your project..."
              disabled={loading}
              maxLength={300}
              className="flex-1 rounded-lg border border-[#1e1e1e] bg-surface px-3 py-2.5 font-mono text-xs text-foreground placeholder:text-muted/50 focus:border-accent/30 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-background transition-opacity hover:opacity-80 disabled:opacity-30"
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform hover:scale-105"
        aria-label={open ? 'Close chat' : 'Open chat'}
        data-cursor-hover
      >
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
        )}

        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}

        {/* Tooltip */}
        {!open && (
          <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-surface px-3 py-1.5 font-mono text-[10px] tracking-wider text-foreground/70 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Can Areeb build your project?
          </span>
        )}
      </button>
    </div>
  );
}
