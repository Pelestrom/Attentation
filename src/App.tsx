import React, { useState, useEffect } from 'react';
import { School, Filiere, Class } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { SchoolsPage } from './pages/SchoolsPage';
import { FilieresPage } from './pages/FilieresPage';
import { ClassesPage } from './pages/ClassesPage';
import { ClassPage } from './pages/ClassPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginModal } from './components/LoginModal';
import { ThemeProvider } from './context/ThemeContext';
import { api } from './lib/api';
import { checkSupabaseConnection } from './lib/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isConnected = await checkSupabaseConnection();
        setIsSupabaseConnected(isConnected);
        const session = await api.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsSupabaseConnected(false);
        setIsAuthenticated(false);
      }
    };

    initializeApp();
  }, []);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    if (page === 'home' || page === 'schools') {
      setSelectedSchool(null);
      setSelectedFiliere(null);
      setSelectedClass(null);
    }
  };

  const handleFiliereSelect = (filiere: Filiere) => {
    if (!isAuthenticated) {
      setSelectedFiliere(filiere);
      setShowLoginModal(true);
    }
  };

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const { session } = await api.auth.signIn(credentials.email, credentials.password);
      if (session) {
        setIsAuthenticated(true);
        setShowLoginModal(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const renderContent = () => {
    if (!isSupabaseConnected) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-600 bg-red-100 p-4 rounded-lg">
            <p className="font-semibold">Erreur de connexion à la base de données</p>
            <p>Veuillez vérifier la configuration de Supabase</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onGetStarted={() => handleNavigation('schools')} />;
      case 'schools':
        if (selectedClass) {
          return (
            <ClassPage
              classData={selectedClass}
              onBack={() => setSelectedClass(null)}
            />
          );
        }
        if (selectedFiliere && isAuthenticated) {
          return (
            <ClassesPage
              filiere={selectedFiliere}
              onBack={() => setSelectedFiliere(null)}
              onClassSelect={setSelectedClass}
            />
          );
        }
        if (selectedSchool) {
          return (
            <FilieresPage
              school={selectedSchool}
              onBack={() => setSelectedSchool(null)}
              onFiliereSelect={handleFiliereSelect}
            />
          );
        }
        return <SchoolsPage onSchoolSelect={setSelectedSchool} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
        <main className="min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </main>
        {showLoginModal && selectedFiliere && (
          <LoginModal
            department={selectedFiliere.name}
            onClose={() => {
              setShowLoginModal(false);
              setSelectedFiliere(null);
            }}
            onLogin={handleLogin}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;