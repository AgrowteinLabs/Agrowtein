import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import Team from './Team';
import Vendor from './Vendor';
import Footer from './Footer';
import HeaderSection from './HeaderSection';

const AboutUsPage = () => {
  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about' }
  ];
  
  return (
    <div>
      <Topbar />
      <Navbar />
      <HeaderSection title="About Us" breadcrumb={breadcrumb} />
      <AboutUs />
      <Team />
      <Vendor />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
