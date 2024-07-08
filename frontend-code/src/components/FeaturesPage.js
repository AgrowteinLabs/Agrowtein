import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Features from './Features';
import Vendor from './Vendor';
import Footer from './Footer';
import HeaderSection from './HeaderSection';


const FeaturesPage = () => {
  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: 'Features', link: '/features' }
  ];

  return (
    <div>
      <Topbar />
      <Navbar />
      <HeaderSection title="Features" breadcrumb={breadcrumb} />
      <Features/>
      <Vendor />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
