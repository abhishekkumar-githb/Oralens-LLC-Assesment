import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Organization } from '../types';
import toast from 'react-hot-toast';
import Modal from '../components/modals/Modal';
import OrganizationForm from '../components/forms/OrganizationForm';
import OrganizationCard from '../components/cards/OrganizationCard';

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [teamCounts, setTeamCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data: orgs, error: orgsError } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (orgsError) throw orgsError;

      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select('organization_id');

      if (teamsError) throw teamsError;

      const counts: Record<string, number> = {};
      teams?.forEach(team => {
        counts[team.organization_id] = (counts[team.organization_id] || 0) + 1;
      });

      setOrganizations(orgs || []);
      setTeamCounts(counts);
    } catch (error) {
      toast.error('Failed to fetch organizations');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchOrganizations();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading organizations...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600 mt-1">Manage your organizations and their teams</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Organization
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {organizations.map((org) => (
          <OrganizationCard
            key={org.id}
            organization={org}
            teamCount={teamCounts[org.id] || 0}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Organization"
      >
        <OrganizationForm
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Organizations;