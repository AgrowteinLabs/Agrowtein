import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Services from './Services';
import Vendor from './Vendor';
import Footer from './Footer';
import HeaderSection from './HeaderSection';

const ProductsAndServices = () => {
  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: 'Products and Services', link: '/products' }
  ];

  return (
    <div>
      <Topbar />
      <Navbar />
      <HeaderSection title="Products and Services" breadcrumb={breadcrumb} />
      <Services />
      <Vendor />
      <Footer />
    </div>
  );
};

export default ProductsAndServices;
