import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/';
import { Register } from './pages/Register';
import { Read } from './pages/Read';
import { Update } from './pages/Update';

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;