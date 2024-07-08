// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AboutUsPage from './components/About';
import ProductsAndServices from './components/ProductsAndServices';
import FeaturesPage from './components/FeaturesPage';
import ContactUsPage from './components/ContactUsPage';
import Login from './components/Login';
import TeamMembersPage from './components/TeamMembersPage';
import BlogsPage from './components/BlogsPage';
import Agventure from './components/Agventure';
import PinepackPro from './components/PinepackPro';
import WebDevelopment from './components/WebDevelopment';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/agventure" element={<Agventure />} />
          <Route path="/pinepack" element={<PinepackPro />} />
          <Route path="/web" element={<WebDevelopment />} />
          <Route path="/products" element={<ProductsAndServices />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/team" element={<TeamMembersPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
  );
}

export default App;
