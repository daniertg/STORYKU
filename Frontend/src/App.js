import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StoryManagement from './components/StoryManagement';
import AddStory from './components/AddStory'; // Import AddStory
import AddChapter from './components/AddChapter'; // Import AddChapter

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navigation />
        <div style={{ marginLeft: '17%', width: '80%' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stories" element={<StoryManagement />} />
            <Route path="/add-story" element={<AddStory />} /> {/* Ganti component dengan element */}
            <Route path="/add-chapter" element={<AddChapter />} /> {/* Ganti component dengan element */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
