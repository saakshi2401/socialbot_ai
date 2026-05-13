import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatArea({ messages, setMessages, currentChatId, setCurrentChatId, platform, tone, feature, refreshChats }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat/generate', {
        chatId: currentChatId,
        prompt: userMessage,
        platform,
        tone,
        feature
      });

      if (!currentChatId) {
        setCurrentChatId(res.data._id);
        refreshChats();
      }
      
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative">
      {/* Header */}
      <div className="h-16 border-b border-surfaceLight flex items-center justify-center px-6 shrink-0 bg-surface/50 backdrop-blur-md">
        <div className="text-sm font-medium text-textMuted uppercase tracking-wider">
          {feature} <span className="mx-2 text-surfaceLight">•</span> {platform} <span className="mx-2 text-surfaceLight">•</span> {tone}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-textMuted">
            <Bot className="w-16 h-16 text-primary/40 mb-4" />
            <h2 className="text-2xl font-bold text-textMain mb-2">How can I help you today?</h2>
            <p className="max-w-md text-center">Use the panel on the right to select your platform, tool, and tone. Then just tell me what you want to create!</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex space-x-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-surfaceLight text-primary'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-surface border border-surfaceLight text-textMain rounded-tl-sm'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex w-full justify-start">
             <div className="flex space-x-3 max-w-[85%] md:max-w-[70%]">
                <div className="w-8 h-8 rounded-full bg-surfaceLight text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-surface border border-surfaceLight text-textMain rounded-tl-sm flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-sm text-textMuted">Generating...</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask SocialBot to generate ${feature.toLowerCase()}...`}
            className="w-full bg-surface border border-surfaceLight text-textMain rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-lg"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-purple-600 text-white rounded-full transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-xs text-textMuted mt-3">AI can make mistakes. Always review the content before posting to social media.</p>
      </div>
    </div>
  );
}
