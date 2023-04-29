import './App.css';
import QrScannerPage from './pages/QrScanner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPages from './pages/MainPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="scan" element={<QrScannerPage />} />
        <Route path="/*" element={<MainPages />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
