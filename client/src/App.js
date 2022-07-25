import React from 'react';
import 'react-responsive-modal/styles.css';
import { Routes, Route, Link, Outlet } from "react-router-dom";
import M from 'materialize-css';

import { Header, } from './components';
import { Containers, Operations } from './pages';

function App() {
  React.useEffect(() => M.AutoInit(), []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="containers" element={<Containers />} />
        <Route path="operations" element={<Operations />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="container center">
      <Header />
      <nav>
        <Link to="containers">Containers</Link> | {" "}
        <Link to="operations">Movimentações</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
