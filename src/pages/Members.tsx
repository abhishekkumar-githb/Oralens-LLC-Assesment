import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Member } from '../types';
import toast from 'react-hot-toast';
import Modal from '../components/modals/Modal';
import MemberForm from '../components/forms/MemberForm';
import { Plus } from 'lucide-react';

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          team:teams(
            name,
            organization:organizations(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      toast.error('Failed to fetch members');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchMembers();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>
      
      <div className="grid gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h2>
                <p className="mt-1 text-gray-600">{member.email}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                member.image_url ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {member.image_url ? 'Image Uploaded' : 'Image Not Uploaded'}
              </div>
            </div>
            {member.team && (
              <div className="mt-4 text-gray-600">
                <p>
                  <span className="font-medium">Team:</span> {member.team.name}
                </p>
                {member.team.organization && (
                  <p>
                    <span className="font-medium">Organization:</span>{' '}
                    {member.team.organization.name}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Member"
      >
        <MemberForm
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Members;