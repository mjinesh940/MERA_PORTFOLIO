import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY;
  const chatEndRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const contents = newMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        parts: [{ text: m.text }]
      }));

      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        { contents },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY
          }
        }
      );

      const botReply = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't fetch a reply.";
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages([...newMessages, { sender: 'bot', text: 'Error fetching reply.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
        >
          💬
        </div>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbox">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="loading">Thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;