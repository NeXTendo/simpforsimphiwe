import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Heart, Star } from 'lucide-react';
import { fadeInUp } from '../utils/animations';
import { TimelineEvent } from '../types';

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const events: TimelineEvent[] = [
    {
      id: '1',
      title: 'Tiny Baby Girl',
      date: '2005-10-08',
      description: 'The date my be wrong but i know it was somewhere there',
      image: '/src/assets/Held.JPG',
      importance: 'high'
    },
    {
      id: '2',
      title: 'Slightly Older',
      date: '2006-01-22',
      description: 'I\'m just guessing dates here',
      image: '/src/assets/Smallgirl.JPG',
      importance: 'high'
    },
    {
      id: '3',
      title: 'Bald baby',
      date: '2006-03-20',
      description: 'I\'m just guessing dates here',
      image: '/src/assets/Baldbaby.JPG',
      importance: 'high'
    },
    {
      id: '4',
      title: 'In a Skeem',
      date: '2007-07-01',
      description: 'This is when you realized life is tough',
      image: '/src/assets/IMG_1269.JPG',
      importance: 'high'
    },
    {
      id: '4',
      title: 'Slightly older, Life is bright and happy',
      date: '2009-07-08',
      description: 'Your cute little smile has always been super bright',
      image: '/src/assets/Smile.JPG',
      importance: 'high'
    },
    {
      id: '5',
      title: 'Now, super freaky girl!',
      date: new Date().toISOString().split('T')[0],
      description: 'All these events have somehow led to Now, us being freaky together',
      image: '/src/assets/tabkiss.JPG',
      importance: 'high'
    }
  ];

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

      const timelineItems = sectionRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach((item) => observer.observe(item));

      return () => observer.disconnect();
    }
  }, []);

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Heart className="text-red-500" size={20} fill="currentColor" />;
      case 'medium':
        return <Star className="text-yellow-500" size={20} fill="currentColor" />;
      default:
        return <Calendar className="text-blue-500" size={20} />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar size={16} />
            <span>What an interesting journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            This is a short timeline, with some missing events. 😉
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A happy child who grew up to be a woderful girl and continues to do it,
            Make her proud of her journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 to-purple-300 h-full rounded-full"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`timeline-item opacity-0 transform translate-y-8 relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-white border-4 border-pink-400 rounded-full z-10 shadow-lg"></div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} md:w-1/2`}>
                  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${getImportanceColor(event.importance)}`}>
                    {/* Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getImportanceIcon(event.importance)}
                          <span className="text-sm font-medium text-gray-600">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <MapPin className="text-gray-400" size={16} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Special indicator for current birthday */}
                      {event.date === new Date().toISOString().split('T')[0] && (
                        <div className="mt-4 flex items-center space-x-2 text-pink-600">
                          <span className="animate-pulse">🎉</span>
                          <span className="text-sm font-medium">Today's Special Day!</span>
                          <span className="animate-pulse">🎂</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Future placeholder */}
          <div className="timeline-item opacity-0 transform translate-y-8 relative mt-12 text-center"
               style={{ animationDelay: `${events.length * 0.2}s` }}>
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full z-10 shadow-lg animate-pulse"></div>
            
            <div className="ml-20 md:ml-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                To Be Continued... ∞
              </h3>
              <p className="text-gray-600 text-lg">
                Her story is just getting started.🌟💕
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                <span className="animate-bounce">💖</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌈</span>
                <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;