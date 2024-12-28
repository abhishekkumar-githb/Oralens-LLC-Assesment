import React from 'react';
import { MapPin, Mail, Users2, Calendar } from 'lucide-react';
import { Organization } from '../../types';

interface OrganizationCardProps {
  organization: Organization;
  teamCount: number;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization, teamCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{organization.name}</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{organization.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{organization.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users2 className="w-4 h-4 mr-2" />
              <span>{teamCount} Teams</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Created {new Date(organization.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {organization.name.charAt(0)}
          </span>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          View Details
        </button>
        <button className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          Manage Teams
        </button>
      </div>
    </div>
  );
};

export default OrganizationCard;