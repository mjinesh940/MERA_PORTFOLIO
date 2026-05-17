import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [isHovered, setIsHovered] = useState(false);
  const [hoverHint, setHoverHint] = useState('');
  const [hintPos, setHintPos] = useState({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [hasNewResponse, setHasNewResponse] = useState(false);
  const [guidedIndex, setGuidedIndex] = useState(0);
  const audioCtx = useRef(null);
  const chatContainerRef = useRef(null);
  const location = useLocation();
  const currentPath = (location.pathname || '/').replace(/^\/MERA_PORTFOLIO/, '') || '/';
  const pageSuggestionsMap = {
    '/': [
      "What are Jinesh's top skills?",
      'Show me his latest project',
      'How can I contact him?',
    ],
    '/about': [
      'What makes Jinesh a strong developer?',
      'Tell me about his education and certifications',
      'How does he approach project work?',
    ],
    '/projects': [
      'Describe the Scholarship Portal project',
      'What tech stacks does Jinesh use?',
      'Show me his favorite project',
    ],
    '/experience': [
      'What enterprise work has he done?',
      'Tell me about his SAP ABAP experience',
      'What is his current role?',
    ],
    '/enterpriseprojects': [
      'What enterprise projects has he worked on?',
      'Tell me about the TKSS engagement',
      'What SAP experience does he have?',
    ],
    '/blog': [
      'What blog topics does he write about?',
      'Does he have any React tutorials?',
      'Show me his posts on APIs',
    ],
    '/contact': [
      'How can I reach Jinesh?',
      'What is his preferred contact method?',
      'Does he accept freelance work?',
    ],
    default: [
      'Tell me about your full stack skills',
      'What project are you most proud of?',
      'How can I work with you?',
    ],
  };
  const pageSuggestions = pageSuggestionsMap[currentPath] || pageSuggestionsMap.default;
  const pageInsightMap = {
    '/': 'Quickly ask about Jinesh’s key skills, latest project, or contact options.',
    '/about': 'Ask what makes Jinesh a strong developer or about his certifications.',
    '/projects': 'Request details for any project and the technologies used.',
    '/experience': 'Get a summary of Jinesh’s SAP and enterprise experience.',
    '/enterpriseprojects': 'Ask for enterprise project highlights or client work details.',
    '/blog': 'Ask what tech topics he writes about most.',
    '/contact': 'Learn his preferred contact method or availability.',
    default: 'Ask anything about Jinesh’s work, skills, or projects.',
  };
  const pageToastMap = {
    '/': 'Welcome to home! Ask me about Jinesh’s skills or latest work.',
    '/about': 'On About — explore certifications, experience, and strengths.',
    '/projects': 'On Projects — ask about the featured apps and stacks.',
    '/experience': 'On Experience — ask about SAP, enterprise projects, and roles.',
    '/enterpriseprojects': 'On Enterprise Projects — ask about client and enterprise work.',
    '/blog': 'On Blog — ask about posts, tutorials, and learning topics.',
    '/contact': 'On Contact — ask how to reach Jinesh or collaborate.',
    default: 'Ask me any question about Jinesh’s portfolio, skills, or experience.',
  };
  const pageInsight = pageInsightMap[currentPath] || pageInsightMap.default;
  const pageToast = pageToastMap[currentPath] || pageToastMap.default;
  const ANTHROPIC_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
  const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
  const useGemini = Boolean(GEMINI_KEY);
  const providerName = useGemini ? 'Google Gemini' : ANTHROPIC_KEY ? 'Anthropic' : null;
  const isDemoMode = !providerName;
  const keyProblem = !providerName
    ? 'No API key found. Add REACT_APP_GEMINI_KEY to .env to enable live AI responses.'
    : null;
  const guidedFlow = [
    { label: 'Ask about projects', prompt: 'Tell me about his strongest projects.' },
    { label: 'Ask about skills', prompt: "What are Jinesh's core technical skills?" },
    { label: 'Ask about contact', prompt: 'How can I contact Jinesh for work?' },
  ];
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(() => ({
    bottom: 24,
    left: typeof window !== 'undefined' ? window.innerWidth - 92 : 20,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!pageToast) return;
    setToastMessage(pageToast);
    setShowToast(true);
    const toastTimer = window.setTimeout(() => setShowToast(false), 4200);
    return () => window.clearTimeout(toastTimer);
  }, [pageToast]);

  useEffect(() => {
    if (isOpen) setHasNewResponse(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target) &&
        (!btnRef.current || !btnRef.current.contains(event.target))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const playNotification = () => {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx.current) audioCtx.current = new AudioCtx();
    const ctx = audioCtx.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 520;
    gainNode.gain.value = 0.12;
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.12);
  };

  const handleMouseMoveHint = (e, hint) => {
    setHoverHint(hint);
    setHintPos({ x: e.clientX + 12, y: e.clientY + 10 });
  };

  const clearHoverHint = () => {
    setHoverHint('');
  };

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

  const sendMessage = async (promptText) => {
    const textToSend = (promptText ?? input).trim();
    if (!textToSend || loading) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!promptText) setInput('');
    setLoading(true);

    if (isDemoMode) {
      const demoText = keyProblem ||
        `Demo mode is active. Add ${useGemini ? 'REACT_APP_GEMINI_KEY' : 'REACT_APP_ANTHROPIC_API_KEY'} to your .env file for live AI responses. Meanwhile, ask me about skills, projects, or contact details.`;
      setMessages([...newMessages, { sender: 'bot', text: demoText }]);
      setHasNewResponse(true);
      setLoading(false);
      return;
    }

    try {
      const response = await (async () => {
        if (useGemini) {
          return fetch(
             `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,   
             {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
  contents: [
    {
      parts: [
        {
          text: `${PORTFOLIO_CONTEXT}\n\nUser: ${textToSend}`,
        },
      ],
    },
  ],
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 500,
  },
}),
            }
          );
        }
        const conversationHistory = newMessages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));
        return fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ANTHROPIC_KEY}`,
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: PORTFOLIO_CONTEXT,
            messages: conversationHistory,
          }),
        });
      })();

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errMessage = errData?.error?.message || response.statusText || 'Unknown error';
        throw new Error(`${useGemini ? 'Gemini' : 'Anthropic'} API error: ${response.status} - ${errMessage}`);
      }

      const data = await response.json();
      const botReply = useGemini
        ? data?.candidates?.[0]?.content?.parts?.[0]?.text ||'Sorry, I could not get a valid Gemini response.'
        : typeof data?.completion === 'string'
          ? data.completion
          : data?.completion?.content?.[0]?.text ||
            data?.message?.content?.[0]?.text ||
            data?.content?.[0]?.text ||
            'Sorry, I could not get a valid response.';

      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
      playNotification();
      if (!isOpen) setHasNewResponse(true);
    } catch (err) {
      console.error('ChatBot error:', err);
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: `Something went wrong. ${err.message || 'Please try again later.'}`,
        },
      ]);
      playNotification();
      if (!isOpen) setHasNewResponse(true);
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
        <>
          <div
            ref={btnRef}
            className={`chatbot-button ${hasNewResponse ? 'new-response' : ''}`}
            style={{ bottom: position.bottom, left: position.left }}
            onMouseDown={handleMouseDown}
            onClick={handleBtnClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title="Chat with AI Assistant"
          >
            💬
            {hasNewResponse && <span className="new-response-dot" />}
          </div>
          {isHovered && (
            <div className="chatbot-hover-tip" style={{ bottom: position.bottom + 70, left: position.left }}>
              Ask me about projects, experience, or contact details
            </div>
          )}
        </>
      )}
      {hoverHint && (
        <div className="chatbot-hint-tooltip" style={{ top: hintPos.y, left: hintPos.x }}>
          {hoverHint}
        </div>
      )}

      {showToast && (
        <div className="chatbot-toast">
          {toastMessage}
        </div>
      )}

      {isOpen && <div className="chatbot-overlay" />}

      {isOpen && (
        <div
          className="chatbot-container"
          ref={chatContainerRef}
          style={{
  bottom: position.bottom + 80,
  left: Math.max(position.left - 330, 10),
}}
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

          <div className="chatbot-insight">
            {pageInsight}
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

          <div className="chatbot-suggestions">
            <div className="suggestion-heading">Suggestions for this page</div>
            <div className="suggestion-grid">
              {pageSuggestions.map((prompt, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => sendMessage(prompt)}
                  onMouseEnter={(e) => handleMouseMoveHint(e, `Ask the bot about: ${prompt}`)}
                  onMouseMove={(e) => handleMouseMoveHint(e, `Ask the bot about: ${prompt}`)}
                  onMouseLeave={clearHoverHint}
                  title={prompt}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="guided-flow">
            <div className="flow-heading">Guided flow</div>
            <div className="flow-grid">
              {guidedFlow.map((step, i) => (
                <button
                  key={i}
                  className={`flow-chip ${guidedIndex === i ? 'active' : ''}`}
                  onClick={() => {
                    setGuidedIndex(i);
                    sendMessage(step.prompt);
                  }}
                  onMouseEnter={(e) => handleMouseMoveHint(e, `Try: ${step.label}`)}
                  onMouseLeave={clearHoverHint}
                >
                  {step.label}
                </button>
              ))}
            </div>
          </div>

          {messages.length <= 1 && (
            <div className="quick-prompts">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  className="quick-prompt-btn"
                  onClick={() => sendMessage(p)}
                  onMouseEnter={(e) => handleMouseMoveHint(e, `Quick ask: ${p}`)}
                  onMouseMove={(e) => handleMouseMoveHint(e, `Quick ask: ${p}`)}
                  onMouseLeave={clearHoverHint}
                  title={p}
                >
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