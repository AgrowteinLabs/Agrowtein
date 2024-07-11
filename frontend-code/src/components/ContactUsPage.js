import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Vendor from './Vendor';
import Footer from './Footer';
import ContactUs from './ContactUs';
import HeaderSection from './HeaderSection';


const ContactUsPage = () => {
  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: 'Contact Us', link: '/contact' }
  ];

  return (
    <>
      <Topbar />
      <Navbar />
      <HeaderSection title="Contact Us" breadcrumb={breadcrumb} />
      <ContactUs />
      <Vendor />
      <Footer />
    </>
  );
};

export default ContactUsPage;
