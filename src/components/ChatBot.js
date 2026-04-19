import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const PORTFOLIO_CONTEXT = `You are an AI assistant embedded in Jinesh Jitendra Modi's personal portfolio website.

About Jinesh:
- Full name: Jinesh Jitendra Modi
- Role: SAP ABAP Associate & Full Stack Developer
- Skills: SAP ABAP, OData, Fiori, Java, Spring Boot, Hibernate, React, JavaScript, SQL, PHP, Data Analytics, Android Development
- Education: Java Full Stack Development certification from QSpiders (2024)
- Projects:
  1. Scholarship Portal – manages scholarship applications (GitHub: mjinesh940/Scholarship-Portal)
  2. Feed Forward Portal – interactive feedback platform (GitHub: mjinesh940/Feed_Forward)
  3. Text & Sentiment Analysis – ML-based text classification (GitHub: mjinesh940/Text_Analysis)
- Experience:
  - SAP ABAP Associate (Current) – ALV Reports, Scripts, Smartforms, Adobe Forms, OData, BAPIs
  - Java Full Stack Trainee at QSpiders (Jan–Aug 2024)
  - Software Engineer Virtual Experience at JP Morgan Chase & Co. (July 2023)
  - Android Development Intern at GSI Group (Sept 2024)
  - AU Data Analytics Virtual Experience at KPMG (Aug 2023)
- Certifications: JP Morgan Software Engineer VE, LinkedIn Learning Project Management, QSpiders Java Full Stack, RedHat OpenShift (DO101), GSI Group Android Dev, Elements of AI (Univ. of Helsinki), Infosys AI Primer, Agile (JP Morgan), KPMG Data Analytics
- Blog: jmshines940.blogspot.com – topics: React Hooks, Spring Boot Microservices, Scalable APIs, SAP ABAP Basics, SAP OData
- GitHub: github.com/mjinesh940
- Resume: available via link on the portfolio

You should answer questions about Jinesh's skills, projects, experience, blog posts, or general coding/tech questions helpfully and concisely. Keep answers friendly and professional. If asked something unrelated to tech/portfolio, you can still help generally.`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! 👋 I'm Jinesh's AI assistant. Ask me about his skills, projects, experience, or anything tech-related!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ bottom: 20, left: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Draggable button
  const handleMouseDown = (e) => {
    setIsDragging(false);
    const rect = btnRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const handleMouseMove = (e) => {
      setIsDragging(true);
      const newLeft = e.clientX - dragOffset.current.x;
      const newBottom = window.innerHeight - e.clientY - (rect.height - dragOffset.current.y);
      setPosition({
        left: Math.max(0, Math.min(newLeft, window.innerWidth - rect.width)),
        bottom: Math.max(0, Math.min(newBottom, window.innerHeight - rect.height)),
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleBtnClick = () => {
    if (!isDragging) setIsOpen(true);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const conversationHistory = newMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: PORTFOLIO_CONTEXT,
          messages: conversationHistory,
        }),
      });

      const data = await response.json();
      const botReply =
        data?.content?.[0]?.text ?? "Sorry, I couldn't get a response right now.";
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "What are Jinesh's skills?",
    'Tell me about his projects',
    'What experience does he have?',
  ];

  return (
    <>
      {!isOpen && (
        <div
          ref={btnRef}
          className="chatbot-button"
          style={{ bottom: position.bottom, left: position.left }}
          onMouseDown={handleMouseDown}
          onClick={handleBtnClick}
          title="Chat with AI Assistant"
        >
          💬
        </div>
      )}

      {isOpen && (
        <div
          className="chatbot-container"
          style={{ bottom: position.bottom + 70, left: position.left }}
        >
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar">🤖</span>
              <div>
                <div className="chatbot-name">Jinesh's AI Assistant</div>
                <div className="chatbot-status">
                  <span className="status-dot" />
                  Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">✖</button>
          </div>

          <div className="chatbox">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                {msg.sender === 'bot' && <span className="bot-icon">🤖</span>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <span className="bot-icon">🤖</span>
                <div className="message-bubble loading-bubble">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {messages.length <= 1 && (
            <div className="quick-prompts">
              {quickPrompts.map((p, i) => (
                <button key={i} className="quick-prompt-btn" onClick={() => setInput(p)}>
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Jinesh or anything tech..."
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? '...' : '➤'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;