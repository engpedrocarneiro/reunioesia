import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Settings } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <FileText className="h-6 w-6 mr-2" />
              <span className="font-medium">Notas de Reunião</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/reunioes"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              <Calendar className="h-5 w-5 mr-1" />
              <span>Reuniões</span>
            </Link>
            
            <Link
              to="/configuracoes"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              <Settings className="h-5 w-5 mr-1" />
              <span>Configurações</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}