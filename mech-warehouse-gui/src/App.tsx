import React from 'react';
import Routing from './routes/Routing';
import Footer from './components/layout/Footer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routing />
      <Footer />
    </div>
  );
}

export default App;