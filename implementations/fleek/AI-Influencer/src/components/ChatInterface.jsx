import React, { useState, useRef, useEffect } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const eliza = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Dynamically import and initialize Eliza
    import('eliza-core/eliza').then((module) => {
      console.log('Eliza module:', module);
      if (module.Eliza) {
        eliza.current = new module.Eliza();
        console.log('Eliza initialized successfully');
      } else {
        console.error('Eliza class not found in module:', module);
      }
    }).catch(error => {
      console.error('Failed to load Eliza module:', error);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !eliza.current) return;

    // User message
    setMessages(prev => [...prev, { text: inputText, isBot: false }]);
    
    // Bot response
    const reply = eliza.current.transform(inputText);
    setMessages(prev => [...prev, { text: reply, isBot: true }]);
    
    setInputText('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Talk to your AI influencer..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
