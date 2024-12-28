import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Users2, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            OrgDash
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/organizations"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/organizations')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Organizations</span>
            </Link>
            <Link
              to="/teams"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/teams')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users2 className="w-4 h-4" />
              <span>Teams</span>
            </Link>
            <Link
              to="/members"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/members')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Members</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;