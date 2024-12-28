import React, { useState, useEffect } from 'react';
import { Building2, Users2, Users, Calendar, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Stats {
  organizations: number;
  teams: number;
  members: number;
}

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ organizations: 0, teams: 0, members: 0 });
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [orgs, teams, members, eventsData] = await Promise.all([
        supabase.from('organizations').select('id', { count: 'exact' }),
        supabase.from('teams').select('id', { count: 'exact' }),
        supabase.from('members').select('id', { count: 'exact' }),
        supabase.from('events').select('*').order('date')
      ]);

      setStats({
        organizations: orgs.count || 0,
        teams: teams.count || 0,
        members: members.count || 0
      });

      setEvents(eventsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'member',
      description: 'New member John Doe joined Team Alpha',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'team',
      description: 'Development Team was created',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'organization',
      description: 'Tech Corp organization details updated',
      timestamp: '1 day ago'
    }
  ];

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600">Here's what's happening in your organizations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Organizations', count: stats.organizations, icon: Building2, color: 'blue' },
          { title: 'Teams', count: stats.teams, icon: Users2, color: 'green' },
          { title: 'Members', count: stats.members, icon: Users, color: 'purple' }
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className={`inline-flex p-3 rounded-lg bg-${stat.color}-50`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">{stat.title}</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="flex-none w-16 text-center">
                  <div className="text-sm font-medium text-blue-600">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.type}</p>
                  <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                    Register Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;