import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Team from './Team';
import Vendor from './Vendor';
import Footer from './Footer';
import HeaderSection from './HeaderSection';


const TeamMembersPage = () => {
  const breadcrumb = [
    { label: 'Home', link: '/' },
    { label: 'Team Members', link: '/team' }
  ];

  return (
    <div>
      <Topbar />
      <Navbar />
      <HeaderSection title="Team Members" breadcrumb={breadcrumb} />
      <Team />
      <Vendor />
      <Footer />
    </div>
  );
};

export default TeamMembersPage;
