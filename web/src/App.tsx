import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ListProperty } from './pages/ListProperty';
import { AdminDashboard } from './pages/AdminDashboard';
import { DealRoom } from './pages/DealRoom';
import { BuilderDashboard } from './pages/BuilderDashboard';

import { SearchPage } from './pages/Search';
import { PropertyProfile } from './pages/PropertyProfile';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';

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
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/deal/:id" element={<DealRoom />} />
          <Route path="/builder" element={<BuilderDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
