
import { useState } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Reality Check assistant. I can help you think through ideas, provide feedback, or just chat about what's on your mind. What would you like to discuss?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // This is a placeholder for OpenAI integration
      // In a real implementation, you would make an API call to your backend
      // which would then call OpenAI's API with your API key
      const response = await mockOpenAIResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const mockOpenAIResponse = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock responses based on keywords for demonstration
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('idea') || lowerMessage.includes('project')) {
      return "That sounds like an interesting idea! Let's break it down: What's the main problem you're trying to solve? Who would benefit from this? What would success look like to you?";
    } else if (lowerMessage.includes('stuck') || lowerMessage.includes('problem')) {
      return "I understand you're facing a challenge. Sometimes stepping back helps - what's the core issue here? Have you tried approaching it from a different angle?";
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('plan')) {
      return "Goals are great! Let's make sure it's realistic and actionable. What specific steps can you take this week to move closer to this goal?";
    } else {
      return "I hear you. Tell me more about what's on your mind - I'm here to help you think through it.";
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border border-white/20 text-white max-w-2xl h-[600px] flex flex-col rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-green-400" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            Reality Check 🤖
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                        : 'bg-gradient-to-r from-green-500 to-teal-500 shadow-lg'
                    }`}>
                      {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div
                      className={`rounded-2xl p-4 backdrop-blur-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-100 border border-blue-400/30'
                          : 'bg-white/10 text-gray-200 border border-white/20'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-2 opacity-75">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-white/10 text-gray-200 rounded-2xl p-4 border border-white/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="flex gap-3 mt-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="What's on your mind? ✨"
              className="glass-card border-white/20 text-white placeholder-gray-400 flex-1 rounded-2xl h-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="fun-button h-12 px-6 rounded-2xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
