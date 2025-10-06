import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

interface AdultGatewayProps {
  onUnlock: () => void;
}

const AdultGateway: React.FC<AdultGatewayProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // The secret passcode - change this to your private code
  const SECRET_CODE = '291023'; // Change this to your private passcode

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsLocked(false);
      setAttempts(0);
    }
    return () => clearInterval(interval);
  }, [isLocked, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;

    if (passcode === SECRET_CODE) {
      onUnlock();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPasscode('');
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setTimeLeft(300); // 5 minutes lockout
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Warning Banner */}
        <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3">
            <AlertTriangle className="text-red-400" size={24} />
            <span className="text-red-300 font-bold text-lg">18+ CONTENT WARNING</span>
          </div>
          <p className="text-red-200 text-sm leading-relaxed">
            This section contains explicit adult content intended for mature audiences only. 
            By proceeding, you confirm you are 18+ years old and consent to viewing such material.
          </p>
        </div>

        {/* Gateway Card */}
        <div className="bg-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="p-4 bg-red-600/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Shield className="text-red-400" size={36} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Private Access</h2>
            <p className="text-red-300">Enter the secret code only we know</p>
          </div>

          {isLocked ? (
            <div className="text-center">
              <Lock className="text-red-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-red-400 mb-2">Access Temporarily Locked</h3>
              <p className="text-red-300 mb-4">Too many failed attempts</p>
              <div className="text-2xl font-mono text-white bg-red-600/20 rounded-lg p-4">
                {formatTime(timeLeft)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-red-300 text-sm font-medium mb-2">
                  Secret Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-xl text-white placeholder-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter private code..."
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300"
                  >
                    {showPasscode ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {attempts > 0 && (
                <div className="text-red-400 text-sm text-center">
                  Incorrect passcode. {3 - attempts} attempts remaining.
                </div>
              )}

              <button
                type="submit"
                disabled={!passcode.trim() || isLocked}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Lock size={20} />
                  <span>Unlock Private Section</span>
                </div>
              </button>
            </form>
          )}

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-red-500/20">
            <div className="flex items-center space-x-2 text-red-400 text-xs">
              <Shield size={14} />
              <span>Protected by advanced security measures</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultGateway;