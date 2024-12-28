import React from 'react';
import { Users, Building2, Calendar } from 'lucide-react';
import { Team } from '../../types';

interface TeamCardProps {
  team: Team;
  memberCount: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, memberCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{team.organization?.name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{memberCount} Members</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Created {new Date(team.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {team.name.charAt(0)}
          </span>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
          View Details
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          Manage Members
        </button>
      </div>
    </div>
  );
};

export default TeamCard;