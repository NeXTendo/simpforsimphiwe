import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Volume2, VolumeX, Moon, Sun, Zap, ZapOff, RotateCcw, Heart, Download, Upload, Shield, Music, Lock, Eye, Smartphone, Trash2 } from 'lucide-react';
import { getSettings, saveSettings, incrementVisitCount } from '../utils/localStorage';
import { Settings as SettingsType } from '../types';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<SettingsType>(getSettings());
  const [activeTab, setActiveTab] = useState('general');

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
    if (confirm('Are you sure you want to reset all settings? This will clear your visit history, preferences, and all saved data.')) {
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
      version: '2.0',
      exportType: 'complete'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birthday-website-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.settings) {
          Object.keys(data.settings).forEach(key => {
            updateSetting(key as keyof SettingsType, data.settings[key]);
          });
          alert('Settings imported successfully!');
        }
      }catch (error) {
        console.error('Import error:', error);
        alert('Error importing settings. Please check the file format.');
        }
    };
    reader.readAsText(file);
  };

  const clearCache = () => {
    if (confirm('Clear all cached data? This will remove downloaded images and temporary files.')) {
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      alert('Cache cleared successfully!');
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'audio', name: 'Audio & Music', icon: Music },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'data', name: 'Data & Storage', icon: Download },
    { id: 'about', name: 'About', icon: Heart }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
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

        <div className="flex h-[calc(90vh-100px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">General Settings</h3>
                  
                  {/* Visit Stats */}
                  <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <Heart className="text-red-500 mr-2" size={20} />
                      Visit Statistics
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
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
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600">{settings.hiddenTreasuresFound.length}</div>
                        <div className="text-sm text-gray-600">Treasures Found</div>
                      </div>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Smartphone className="text-blue-500 mr-2" size={20} />
                      Device Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Screen Size:</span>
                        <span className="ml-2 font-medium">{window.screen.width}×{window.screen.height}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Browser:</span>
                        <span className="ml-2 font-medium">{navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Other'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Platform:</span>
                        <span className="ml-2 font-medium">{navigator.platform}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Online:</span>
                        <span className="ml-2 font-medium">{navigator.onLine ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Appearance & Display</h3>
                  
                  {/* Theme Settings */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Palette className="text-blue-500 mr-2" size={20} />
                      Theme Selection
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => updateSetting('theme', 'light')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          settings.theme === 'light'
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                        }`}
                      >
                        <Sun size={32} className="mx-auto mb-3 text-yellow-500" />
                        <div className="font-semibold text-gray-800">Light Mode</div>
                        <div className="text-sm text-gray-600 mt-1">Bright and cheerful</div>
                      </button>
                      
                      <button
                        onClick={() => updateSetting('theme', 'dark')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          settings.theme === 'dark'
                            ? 'border-purple-400 bg-purple-50 shadow-lg'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <Moon size={32} className="mx-auto mb-3 text-purple-500" />
                        <div className="font-semibold text-gray-800">Dark Mode</div>
                        <div className="text-sm text-gray-600 mt-1">Easy on the eyes</div>
                      </button>
                    </div>
                  </div>

                  {/* Accessibility */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Eye className="text-green-500 mr-2" size={20} />
                      Accessibility Options
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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
                </div>
              </div>
            )}

            {/* Audio Tab */}
            {activeTab === 'audio' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Audio & Music Settings</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <label className="font-medium text-gray-700 block mb-3">
                        Master Volume: {Math.round(settings.volume * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.volume}
                        onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Mute</span>
                        <span>Max</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Music Player Features</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Full playlist with multiple tracks</li>
                        <li>• Shuffle and repeat modes</li>
                        <li>• Volume control and mute</li>
                        <li>• Progress bar with seeking</li>
                        <li>• Like and download options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Privacy & Security</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                        <Lock className="mr-2" size={20} />
                        Adult Section Security
                      </h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Password protected access</li>
                        <li>• Anti-screenshot protection</li>
                        <li>• Screen recording detection</li>
                        <li>• Content blur on focus loss</li>
                        <li>• Disabled right-click and shortcuts</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <Shield className="mr-2" size={20} />
                        Data Privacy
                      </h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• All data stored locally in your browser</li>
                        <li>• No external tracking or analytics</li>
                        <li>• No cookies or third-party scripts</li>
                        <li>• Complete offline functionality</li>
                        <li>• You control all your data</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">Hidden Treasures Progress</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-700">Progress</span>
                        <span className="text-sm font-medium text-blue-800">
                          {settings.hiddenTreasuresFound.length} / 4 found
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(settings.hiddenTreasuresFound.length / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Data Management</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={exportData}
                        className="flex items-center justify-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors duration-200"
                      >
                        <Download size={20} />
                        <div className="text-left">
                          <div className="font-semibold">Export Data</div>
                          <div className="text-xs text-blue-600">Download all settings</div>
                        </div>
                      </button>
                      
                      <label className="flex items-center justify-center space-x-3 p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors duration-200 cursor-pointer">
                        <Upload size={20} />
                        <div className="text-left">
                          <div className="font-semibold">Import Data</div>
                          <div className="text-xs text-green-600">Restore from backup</div>
                        </div>
                        <input
                          type="file"
                          accept=".json"
                          onChange={importData}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={clearCache}
                        className="flex items-center justify-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl transition-colors duration-200"
                      >
                        <Trash2 size={20} />
                        <div className="text-left">
                          <div className="font-semibold">Clear Cache</div>
                          <div className="text-xs text-yellow-600">Free up storage</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={resetSettings}
                        className="flex items-center justify-center space-x-3 p-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors duration-200"
                      >
                        <RotateCcw size={20} />
                        <div className="text-left">
                          <div className="font-semibold">Reset All</div>
                          <div className="text-xs text-red-600">Clear everything</div>
                        </div>
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Storage Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Settings:</span>
                          <span className="ml-2 font-medium">Saved locally</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Media:</span>
                          <span className="ml-2 font-medium">Cached</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Progress:</span>
                          <span className="ml-2 font-medium">Persistent</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Bookmarks:</span>
                          <span className="ml-2 font-medium">Local storage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">About This Website</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-6 text-center">
                      <Heart className="mx-auto mb-4 text-red-500" size={48} fill="currentColor" />
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Made with Love</h4>
                      <p className="text-gray-600">
                        This website was created with endless love and attention to detail, 
                        just for you. Every setting, every animation, every pixel - 
                        crafted to celebrate you!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">Features</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Interactive love notes with reactions</li>
                          <li>• Photo gallery with lightbox</li>
                          <li>• Memory games and quizzes</li>
                          <li>• Hidden treasures and surprises</li>
                          <li>• Digital scrapbook with page flips</li>
                          <li>• Music player with full controls</li>
                          <li>• Timeline of your relationship</li>
                          <li>• Private adult section (18+)</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-4">
                        <h4 className="font-semibold text-purple-800 mb-3">Technology</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• React + TypeScript</li>
                          <li>• Tailwind CSS styling</li>
                          <li>• GSAP animations</li>
                          <li>• Canvas confetti effects</li>
                          <li>• Local storage persistence</li>
                          <li>• Responsive design</li>
                          <li>• PWA capabilities</li>
                          <li>• GitHub Pages hosting</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <h4 className="font-semibold text-green-800 mb-3">Version Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-600">Version:</span>
                          <span className="ml-2 font-medium">2.0.0</span>
                        </div>
                        <div>
                          <span className="text-green-600">Last Updated:</span>
                          <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-green-600">Build:</span>
                          <span className="ml-2 font-medium">Production</span>
                        </div>
                        <div>
                          <span className="text-green-600">Status:</span>
                          <span className="ml-2 font-medium text-green-700">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;