
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MailIcon, LockClosedIcon } from './Icons';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (!success) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-center text-white">تسجيل الدخول</h3>
      <p className="text-center text-gray-400 mb-4 text-sm">
        استخدم الحساب المفتوح مسبقاً: <br />
        <span className="font-mono text-indigo-400">user@example.com</span> / <span className="font-mono text-indigo-400">password123</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MailIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 pr-10 pl-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">كلمة المرور</label>
          <div className="relative">
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 pr-10 pl-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default Login;
