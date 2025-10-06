import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Volume2, VolumeX, Moon, Sun, Zap, ZapOff, RotateCcw, Heart } from 'lucide-react';
import { getSettings, saveSettings, incrementVisitCount } from '../utils/localStorage';
import { Settings as SettingsType } from '../types';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<SettingsType>(getSettings());

  useEffect(() => {
    incrementVisitCount();
  }, []);

  const updateSetting = <K extends keyof SettingsType>(
    key: K,
    value: SettingsType[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);

    // Apply theme immediately
    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value as string);
    }

    // Apply reduce motion immediately
    if (key === 'reduceMotion') {
      document.documentElement.style.setProperty(
        '--animation-duration',
        value ? '0s' : '1s'
      );
    }
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings? This will clear your visit history and preferences.')) {
      localStorage.clear();
      const defaultSettings = getSettings();
      setSettings(defaultSettings);
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      settings,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'birthday-website-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SettingsIcon size={28} />
              <h2 className="text-2xl font-bold">Settings & Preferences</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Visit Stats */}
          <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Heart className="text-red-500 mr-2" size={20} />
              Visit Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{settings.visitCount}</div>
                <div className="text-sm text-gray-600">Total Visits</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-purple-600">
                  {new Date(settings.lastVisit).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">Last Visit</div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Palette className="text-blue-500 mr-2" size={20} />
              Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Theme</label>
                  <p className="text-sm text-gray-500">Choose between light and dark mode</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateSetting('theme', 'light')}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      settings.theme === 'light'
                        ? 'border-yellow-400 bg-yellow-50 text-yellow-600'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <Sun size={20} />
                  </button>
                  <button
                    onClick={() => updateSetting('theme', 'dark')}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      settings.theme === 'dark'
                        ? 'border-purple-400 bg-purple-50 text-purple-600'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Moon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Volume2 className="text-green-500 mr-2" size={20} />
              Audio & Sound
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Background Music</label>
                  <p className="text-sm text-gray-500">Play ambient music while browsing</p>
                </div>
                <button
                  onClick={() => updateSetting('backgroundMusic', !settings.backgroundMusic)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    settings.backgroundMusic
                      ? 'border-green-400 bg-green-50 text-green-600'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {settings.backgroundMusic ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
              </div>
              
              <div>
                <label className="font-medium text-gray-700 block mb-2">
                  Volume: {Math.round(settings.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="text-orange-500 mr-2" size={20} />
              Accessibility
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Reduce Motion</label>
                  <p className="text-sm text-gray-500">Minimize animations for better accessibility</p>
                </div>
                <button
                  onClick={() => updateSetting('reduceMotion', !settings.reduceMotion)}
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    settings.reduceMotion
                      ? 'border-orange-400 bg-orange-50 text-orange-600'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {settings.reduceMotion ? <ZapOff size={20} /> : <Zap size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Hidden Treasures Progress */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🏆 Hidden Treasures Found
            </h3>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-800">
                  {settings.hiddenTreasuresFound.length} / 4 found
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(settings.hiddenTreasuresFound.length / 4) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Keep exploring to find all hidden treasures!
              </p>
            </div>
          </div>

          {/* Data Management */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💾 Data Management
            </h3>
            <div className="space-y-3">
              <button
                onClick={exportData}
                className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors duration-200 text-left"
              >
                📄 Export My Data
                <div className="text-xs text-blue-600 mt-1">Download all your settings and preferences</div>
              </button>
              
              <button
                onClick={resetSettings}
                className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors duration-200 text-left flex items-center"
              >
                <RotateCcw className="mr-2" size={16} />
                Reset All Settings
                <div className="text-xs text-red-600 mt-1 ml-6">This will clear all your data and preferences</div>
              </button>
            </div>
          </div>

          {/* Love Message */}
          <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              💖 Made with Love
            </h3>
            <p className="text-gray-600 text-sm">
              This website was created with endless love and attention to detail, 
              just for you. Every setting, every animation, every pixel - 
              crafted to celebrate you! 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;