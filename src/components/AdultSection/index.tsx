import React, { useState } from 'react';
import AdultGateway from './AdultGateway';
import AdultMain from './AdultMain';

interface AdultSectionProps {
  onExit: () => void;
}

const AdultSection: React.FC<AdultSectionProps> = ({ onExit }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleExit = () => {
    setIsUnlocked(false);
    onExit();
  };

  if (!isUnlocked) {
    return <AdultGateway onUnlock={handleUnlock} />;
  }

  return <AdultMain onExit={handleExit} />;
};

export default AdultSection;