import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import { CdsProvider } from '@chwh/cds';

function App() {
  return (
    <CdsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </CdsProvider>
  );
}

export default App;
