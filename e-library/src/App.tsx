import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import routes from './routes/routes';

function App() {
  const renderRoutes = useRoutes(routes);
  return (
    <div className="App">
      <Navbar />
      <div className="global-wrapper" style={{ padding: '0 6%' }}>
        {renderRoutes}
      </div>
      <Footer />
    </div>
  );
}

export default App;
