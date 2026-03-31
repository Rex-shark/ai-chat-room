import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Loader2, Maximize2, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export default function ChatWidget({ theme }: { theme: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ollama/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.content }),
      });
      const data = await response.json();
      const botMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'bot', content: data.reply || "系統沒有回應任何文字。" };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to fetch from API", error);
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'bot', content: "對不起，目前無法連線至 AI 服務伺服器。" };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // If no theme is selected from the gallery, don't show the widget launcher.
  if (!theme) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end ${theme}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`mb-4 flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card text-card-foreground shadow-2xl origin-bottom-right transition-all duration-300 ease-in-out ${
              isExpanded ? 'h-[calc(100vh-8rem)] w-[calc(100vw-3rem)]' : 'h-[500px] w-[360px]'
            }`}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-background/20 bg-primary p-4 text-primary-foreground shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">專屬 AI 客服</h3>
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="rounded-lg p-1 hover:bg-primary-foreground/20 transition-colors"
                  title={isExpanded ? "縮小" : "全螢幕放大"}
                >
                  {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 hover:bg-primary-foreground/20 transition-colors"
                  title="關閉"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Message Area */}
            <div className="flex-1 overflow-y-auto bg-background/50 p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground space-y-3">
                  <div className="rounded-full bg-muted p-4">
                    <MessageSquare className="h-8 w-8 opacity-50" />
                  </div>
                  <p className="text-sm">歡迎！請輸入任何問題與我交談。<br/>本視窗將連線至 Ollama 本機 API。</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[85%] items-end space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                      <div className={`shrink-0 rounded-full p-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-br-sm' 
                          : 'bg-card border border-border text-foreground rounded-bl-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex w-full justify-start">
                  <div className="flex items-end space-x-2">
                    <div className="shrink-0 rounded-full bg-secondary p-2 text-secondary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <motion.div animate={{y: [0,-3,0]}} transition={{repeat: Infinity, duration: 1, delay: 0}} className="h-2 w-2 rounded-full bg-muted-foreground"></motion.div>
                        <motion.div animate={{y: [0,-3,0]}} transition={{repeat: Infinity, duration: 1, delay: 0.2}} className="h-2 w-2 rounded-full bg-muted-foreground"></motion.div>
                        <motion.div animate={{y: [0,-3,0]}} transition={{repeat: Infinity, duration: 1, delay: 0.4}} className="h-2 w-2 rounded-full bg-muted-foreground"></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t border-border bg-card p-3">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="輸入問題..."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={!input.trim() || isLoading ? {} : { scale: 1.05 }}
                  whileTap={!input.trim() || isLoading ? {} : { scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
