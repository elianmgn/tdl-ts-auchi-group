import React from 'react';
import {
  Outlet
} from 'react-router-dom';
import Header from './header/Header';

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
