
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon, SparklesIcon, LogoutIcon } from './Icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <SparklesIcon className="w-8 h-8 text-indigo-400" />
        <h1 className="text-xl sm:text-2xl font-bold text-white">محرر الصور بالذكاء الاصطناعي</h1>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-sm">
              <UserCircleIcon className="w-6 h-6 text-gray-400" />
              <span className="hidden sm:inline">{user.email}</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-semibold">
                {user.plan === 'lifetime' ? 'مدى الحياة' : 'احترافي'}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-700 hover:bg-red-600 transition-colors text-sm font-medium"
              aria-label="تسجيل الخروج"
            >
              <LogoutIcon className="w-5 h-5" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-400">
             <UserCircleIcon className="w-6 h-6" />
            <span>زائر</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
