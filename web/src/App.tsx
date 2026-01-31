import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ListProperty } from './pages/ListProperty';
import { AdminDashboard } from './pages/AdminDashboard';
import { DealRoom } from './pages/DealRoom';
import { BuilderDashboard } from './pages/BuilderDashboard';

import { SearchPage } from './pages/Search';
import { PropertyProfile } from './pages/PropertyProfile';
import { BuildersPage } from './pages/Builders';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyProfile />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/builders" element={<BuildersPage />} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/deal/:id" element={<ProtectedRoute><DealRoom /></ProtectedRoute>} />
          <Route path="/builder" element={<ProtectedRoute requiredRole="builder"><BuilderDashboard /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
