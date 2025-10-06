import React, { useEffect, useRef } from 'react';
import { X, Shield, Eye, Lock } from 'lucide-react';

interface AdultLayoutProps {
  children: React.ReactNode;
  onExit: () => void;
}

const AdultLayout: React.FC<AdultLayoutProps> = ({ children, onExit }) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anti-screenshot measures
    const preventScreenshot = () => {
      // Disable right-click context menu
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };

      // Disable common screenshot shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        // Disable Print Screen, F12, Ctrl+Shift+I, etc.
        if (
          e.key === 'PrintScreen' ||
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's') ||
          (e.metaKey && e.shiftKey && e.key === '3') ||
          (e.metaKey && e.shiftKey && e.key === '4') ||
          (e.metaKey && e.shiftKey && e.key === '5')
        ) {
          e.preventDefault();
          return false;
        }
      };

      // Disable drag and drop
      const handleDragStart = (e: DragEvent) => {
        e.preventDefault();
        return false;
      };

      // Disable text selection
      const handleSelectStart = (e: Event) => {
        e.preventDefault();
        return false;
      };

      // Add event listeners
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('dragstart', handleDragStart);
      document.addEventListener('selectstart', handleSelectStart);

      // Blur content when window loses focus (potential screen recording)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (layoutRef.current) {
            layoutRef.current.style.filter = 'blur(20px)';
          }
        } else {
          if (layoutRef.current) {
            layoutRef.current.style.filter = 'none';
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Cleanup
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('selectstart', handleSelectStart);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    const cleanup = preventScreenshot();

    // Add CSS to prevent selection and dragging
    const style = document.createElement('style');
    style.textContent = `
      .adult-content * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: auto;
      }
      
      .adult-content img, .adult-content video {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -khtml-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        draggable: false !important;
      }

      /* Disable screenshot on mobile */
      @media (max-width: 768px) {
        .adult-content {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      cleanup?.();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={layoutRef} className="adult-content min-h-screen bg-gradient-to-br from-black via-red-950 to-gray-900">
      {/* Security Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-red-500/30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <Shield className="text-red-400" size={20} />
            <span className="text-red-300 font-medium">Private Section</span>
            <div className="flex items-center space-x-1 text-xs text-red-400">
              <Eye size={12} />
              <span>Protected</span>
            </div>
          </div>
          
          <button
            onClick={onExit}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-300 hover:text-white transition-all duration-200"
          >
            <X size={16} />
            <span>Exit Private Mode</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20">
        {children}
      </div>

      {/* Security Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm border-t border-red-500/20 px-6 py-2">
        <div className="flex items-center justify-center space-x-4 text-xs text-red-400">
          <div className="flex items-center space-x-1">
            <Lock size={12} />
            <span>Screenshot Protected</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Shield size={12} />
            <span>Recording Blocked</span>
          </div>
          <span>•</span>
          <span>Private & Secure</span>
        </div>
      </div>
    </div>
  );
};

export default AdultLayout;