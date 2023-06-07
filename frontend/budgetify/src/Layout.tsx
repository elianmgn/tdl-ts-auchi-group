import React, { ReactNode } from 'react';
import {
  Outlet
} from 'react-router-dom';
import Header from './components/Header';

function Layout() {
  return (
    <div>
      {/* Agregar cualquier contenido comun a todas las rutas */}
      <Header/>

      <main>
        {/* Renderiza el contenido específico de cada ruta */}
        <Outlet/>
      </main>
      
    </div>
  );
}

export default Layout;
