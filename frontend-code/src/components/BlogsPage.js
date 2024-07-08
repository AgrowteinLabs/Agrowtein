import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Footer from './Footer';
import HeaderSection from './HeaderSection';
import Blogs from './Blogs'; // Import the Blogs component

const BlogsPage = () => {
  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: 'Blogs', link: '/blogs' }
  ];

  return (
    <>
      <Topbar />
      <Navbar />
      <HeaderSection title="Blogs" breadcrumb={breadcrumb} />
      <Blogs /> 
      <Footer />
    </>
  );
};

export default BlogsPage;
