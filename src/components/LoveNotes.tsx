import React, { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { marked } from 'marked';
import { fadeInUp, animateHeart } from '../utils/animations';
import { LoveNote } from '../types';
import { getReactions, addReaction } from '../utils/localStorage';

const LoveNotes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [notes] = useState<LoveNote[]>([
    {
      id: '1',
      content: 'Every sunrise and sunset reminds me of your beautiful smile. You light up my world in ways I never thought possible.☀️',
      date: '2025-08-10',
      reactions: 0,
      isMarkdown: false,
    },
    {
      id: '2',
      content: '## You Are My Universe, My bright Star, My Favorite Song, My Home and My Happy Place',
      date: '2025-08-15',
      reactions: 0,
      isMarkdown: true,
    },
    {
      id: '3',
      content: 'I love the way you laugh at my jokes and try to be funnier but you\'re just not as funny as me 😂. But that\'s okay because your smile is my favorite thing in the world.',
      date: '2025-08-22',
      reactions: 0,
      isMarkdown: false,
    },
    {
      id: '4',
      content: '### Three Reasons Why Today Is Perfect 💝\n\n1. **It\'s your birthday** - the day the world became brighter\n2. **You exist** - bringing joy to me and terrorizing to everyone you meet\n3. **We\'re celebrating together** - making memories that will last forever\n\n> *"You are not just a year older, but a year more wonderful!"*',
      date: '2025-08-22',
      reactions: 0,
      isMarkdown: true,
    },
    {
      id: '5',
      content: 'Maahhh I\'m so hot coding today fr fr, pa birthday a roast can cut',
      date: '2025-09-20',
      reactions: 0,
      isMarkdown: true,
    },
    {
      id: '6',
      content: 'Lets talk about our dreams more, Well, you\'re one of my dreams. But i want us to talk about our together dreams more so that they can come true.',
      date: '2025-09-22',
      reactions: 0,
      isMarkdown: false,
    },
  ]);

  useEffect(() => {
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fadeInUp(entry.target as HTMLElement);
            }
          });
        },
        { threshold: 0.1 }
      );

      const noteElements = sectionRef.current.querySelectorAll('.love-note');
      noteElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  const handleReaction = (noteId: string, heartElement: HTMLElement) => {
    addReaction(noteId);
    animateHeart(heartElement);
    
    // Update the note's reaction count in the UI
    const noteElement = heartElement.closest('.love-note');
    if (noteElement) {
      const reactionCount = noteElement.querySelector('.reaction-count');
      if (reactionCount) {
        const currentCount = getReactions(noteId);
        reactionCount.textContent = currentCount.toString();
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageCircle size={16} />
            <span>Daily Love Notes (I will Add More Every Few Days)</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Check every note, I wrote them all for you!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some thoughts i've been saving just for today. 💕
          </p>
        </div>

        <div className="space-y-8">
          {notes.map((note, index) => (
            <div
              key={note.id}
              className="love-note opacity-0 transform translate-y-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded-full">
                      <Sparkles className="text-pink-500" size={20} />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{new Date(note.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => handleReaction(note.id, e.currentTarget)}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors duration-200 group"
                  >
                    <Heart 
                      className="text-red-500 group-hover:scale-110 transition-transform duration-200" 
                      size={18}
                      fill="currentColor"
                    />
                    <span className="reaction-count text-red-600 font-medium">
                      {getReactions(note.id)}
                    </span>
                  </button>
                </div>

                <div className="prose prose-lg max-w-none">
                  {note.isMarkdown ? (
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: marked(note.content) 
                      }}
                      className="prose-pink prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-pink-600 prose-em:text-purple-600"
                    />
                  ) : (
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {note.content}
                    </p>
                  )}
                </div>
              </div>

              {/* Decorative bottom border */}
              <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            More Stuff Down Theyaaa my baby! 
          </h3>
          <p className="text-gray-600 mb-6">
            Keep scrolling to discover your photo gallery and some Nyoods to make you hot.
          </p>
          <div className="flex justify-center space-x-2">
            <div className="animate-bounce">💎</div>
            <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</div>
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveNotes;