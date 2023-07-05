import React from 'react';
import {
  Outlet
} from 'react-router-dom';

function AuthLayout() {
  return (
    <div>
      <main>
        {/* Renderiza el contenido específico de cada ruta */}
        <Outlet/>
      </main>
      
    </div>
  );
}

export default AuthLayout;
