// Routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MustRead from "./components/MustRead";
import MustreadPage from "./components/pages/MustreadPage";
import Finance from "./components/pages/Finance";
import Fin from "./components/pages/Fin";
import Lstyles from "./components/pages/Lstyles";
import Lifestyle from "./components/pages/lifestylePage"
import Entertainment from "./components/pages/Entertainment";
import Article from "./components/pages/article";
import Ent from "./components/pages/EntPage";
import Editors from "./components/pages/Editorspage";
import Spotlight from "./components/pages/spotlightpage";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MustRead />} />
      <Route path="/MustRead/:slug" element={<MustreadPage />} />
      <Route path ="/finance/:slug" element ={<Fin />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/lifestyles" element={<Lstyles />} />
      <Route path="/entertainment" element={<Entertainment />} />
      <Route path="/article/:slug" element={<Article />} />
      <Route path="/lifestyle/:slug" element={<Lifestyle />} />
      <Route path="/Entertainment/:slug" element={<Ent />} />
      <Route path="/editors/:slug" element={<Editors />} />
      <Route path="/spotlight/:slug" element={<Spotlight />} />
      
      
    </Routes>
  );
};

export default AppRoutes;
