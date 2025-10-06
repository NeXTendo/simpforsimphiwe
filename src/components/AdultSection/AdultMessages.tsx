import React, { useState } from 'react';
import { Heart, Siren as Fire, MessageCircle, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'me' | 'you';
  type: 'text' | 'image';
  isExplicit: boolean;
}

const AdultMessages: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: 'I can\'t stop thinking about last night... 🔥',
      timestamp: '2024-01-15T20:30:00',
      sender: 'me',
      type: 'text',
      isExplicit: true
    },
    {
      id: '2',
      content: 'You drive me absolutely wild, baby 😈',
      timestamp: '2024-01-15T20:32:00',
      sender: 'you',
      type: 'text',
      isExplicit: true
    },
    {
      id: '3',
      content: 'I love the way you make me feel... so alive, so desired 💋',
      timestamp: '2024-01-15T20:35:00',
      sender: 'me',
      type: 'text',
      isExplicit: true
    },
    {
      id: '4',
      content: 'Your touch sets my soul on fire... I need you 🔥❤️',
      timestamp: '2024-01-15T20:40:00',
      sender: 'you',
      type: 'text',
      isExplicit: true
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, you'd add the message to the list
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Private Messages
          </h1>
          <p className="text-red-300 text-lg">
            Our most intimate conversations 💋
          </p>
        </div>

        {/* Messages Container */}
        <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 mb-6">
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-red-100 border border-red-500/30'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.isExplicit && (
                      <div className="flex items-center space-x-1">
                        <Fire size={12} className="text-orange-400" />
                        <Heart size={12} className="text-red-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your intimate message..."
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-xl text-white placeholder-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-xl transition-colors duration-200"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </form>

        {/* Message Categories */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-xl p-6 text-center">
            <Fire className="text-orange-400 mx-auto mb-3" size={32} />
            <h3 className="text-white font-bold text-lg mb-2">Passionate</h3>
            <p className="text-red-300 text-sm">Fiery messages of desire</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-xl p-6 text-center">
            <Heart className="text-red-400 mx-auto mb-3" size={32} fill="currentColor" />
            <h3 className="text-white font-bold text-lg mb-2">Romantic</h3>
            <p className="text-red-300 text-sm">Sweet intimate moments</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-xl p-6 text-center">
            <MessageCircle className="text-purple-400 mx-auto mb-3" size={32} />
            <h3 className="text-white font-bold text-lg mb-2">Playful</h3>
            <p className="text-red-300 text-sm">Teasing and flirtatious</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultMessages;