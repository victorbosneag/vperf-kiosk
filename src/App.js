import './App.css';
import QrScanner from './pages/QrScanner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConfigPage from './pages/ConfigPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="scan" element={<QrScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
