
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Editor from './components/Editor';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        {user ? <Editor /> : <AuthScreen />}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-800">
          <p>صُنع بواسطة مهندس React خبير بواجهة Gemini API</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
