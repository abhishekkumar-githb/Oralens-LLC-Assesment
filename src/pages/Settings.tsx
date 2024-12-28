import React from 'react';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';

const Settings = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        <ProfileSettings />
        <SecuritySettings />
        <NotificationSettings />
        <AppearanceSettings />
      </div>
    </div>
  );
};

export default Settings;