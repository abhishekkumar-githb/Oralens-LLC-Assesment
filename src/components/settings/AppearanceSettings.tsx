import React, { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import toast from 'react-hot-toast';

const AppearanceSettings = () => {
  const [theme, setTheme] = useState('system');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">Choose your preferred theme</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 rounded-lg border ${
              theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            } hover:bg-gray-50`}
          >
            <Sun className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="text-sm font-medium text-gray-900">Light</p>
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            } hover:bg-gray-50`}
          >
            <Moon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="text-sm font-medium text-gray-900">Dark</p>
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`p-4 rounded-lg border ${
              theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            } hover:bg-gray-50`}
          >
            <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <p className="text-sm font-medium text-gray-900">System</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppearanceSettings;