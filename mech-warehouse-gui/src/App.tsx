import React from 'react';
import './App.css';
import Routing from './routes/Routing';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Routing />
      <Footer />
    </div>
  );
}

export default App;