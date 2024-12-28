import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Team } from '../types';
import toast from 'react-hot-toast';
import Modal from '../components/modals/Modal';
import TeamForm from '../components/forms/TeamForm';
import TeamCard from '../components/cards/TeamCard';

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          organization:organizations(name)
        `)
        .order('created_at', { ascending: false });

      if (teamsError) throw teamsError;

      const { data: members, error: membersError } = await supabase
        .from('members')
        .select('team_id');

      if (membersError) throw membersError;

      const counts: Record<string, number> = {};
      members?.forEach(member => {
        counts[member.team_id] = (counts[member.team_id] || 0) + 1;
      });

      setTeams(teamsData || []);
      setMemberCounts(counts);
    } catch (error) {
      toast.error('Failed to fetch teams');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchTeams();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600 mt-1">Manage your teams and their members</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Team
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            memberCount={memberCounts[team.id] || 0}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Team"
      >
        <TeamForm
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Teams;