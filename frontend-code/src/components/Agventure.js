import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import pumpImage from '../assets/images/pump 6.jpg'; // Add your image file paths here
import Vendor from './Vendor';
import HeaderSection from './HeaderSection';

const Agventure = () => {
    const breadcrumb = [
        { label: 'Home', link: '/' },
        { label: 'Products and Services', link: '/products' },
        { label: 'Agventure', link: '/agventure' }
      ];
  return (
    <>
      <Topbar />
      <Navbar />
     

      <HeaderSection title="Products and Services" breadcrumb={breadcrumb} />

      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-7">
              <div className="section-title position-relative pb-3 mb-5">
                <h5 className="fw-bold text-success text-uppercase">Innovative Water Pump</h5>
                <h1 className="mb-0">AGVENTURE</h1>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><strong>--Monitoring Pump Performance in Paddy Fields--</strong></h5>
                  <p className="card-text">
                    Our team has been diligently collecting data on the performance of pumps used in paddy fields to gain insights into their efficiency and effectiveness in irrigation practices.
                    This data helps us optimize irrigation schedules and minimize water wastage, contributing to sustainable water management practices.
                  </p>
                  <Link to="/login" className="btn btn-success">Log in for Data</Link>
                </div>
              </div>
              <br />
              <br />
              <p className="mb-4">
                AGROWTEIN LABS PVT LTD proudly introduces its revolutionary water pumping system - AGVENTURE, a transformative solution for traditional farming practices.
                With a dedicated focus on efficiency, affordability, and customization, AGVENTURE seeks to empower farmers with cutting-edge technology, enhancing productivity while concurrently reducing operational costs.
                Featuring a tiltable design for easy maintenance, AGVENTURE's water pumping system mitigates the challenges associated with underwater repairs, ensuring the system's longevity.
                <br />
                <br />
                The in-house System Management Board, crafted by our Research and Development Team, plays a pivotal role in optimizing performance and reliability, bolstering the overall efficiency of the pumping system.
                Moreover, the system offers an unparalleled level of efficiency and affordability, with the potential to reduce operational charges by an impressive 60-70%, providing farmers with substantial economic benefits and fostering accessibility to sustainable farming practices.
                <br />
                <br />
                The fully automated IoT system ensures real-time monitoring of water levels and pH values, overseen by our dedicated team, offering users a worry-free experience and facilitating informed decision-making.
                Customization for diverse applications is a hallmark of AGVENTURE's pump system, tailored to meet the unique needs of each customer, spanning paddy fields, aquaculture, hydroponics, and aquaponics.
                Constant monitoring and timely feedback empower farmers to optimize their practices, making proactive adjustments and improvements.
                <br />
                <br />
                The embedded system for precision, driven by advanced sensors and algorithms, calculates bund strength and adjusts pump pressure accordingly, ensuring operational efficiency and adaptability to changing conditions.
                In conclusion, investing in AGVENTURE's water pumping system is a commitment to the future of farming.
                Through embracing innovation, farmers can elevate their agricultural practices, significantly increasing efficiency, reducing operational costs, and contributing to sustainable farming.
                Choose AGVENTURE for a solution that is both technologically advanced and environmentally conscious, promising to revolutionize the approach to water pumping in agriculture.
              </p>
              <div className="d-flex align-items-center mb-4 wow fadeIn" data-wow-delay="0.6s">
                <div className="bg-success d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                  <Link to="tel:+91 9562603120" className="phone-link">
                    <i className="fa fa-phone-alt text-white"></i>
                  </Link>
                </div>
                <div className="ps-4">
                  <h5 className="mb-2">For more information</h5>
                  <h4 className="text-success mb-0">+91 956 260 3120</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-5" style={{ minHeight: '500px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src={pumpImage} style={{ objectFit: 'cover' }} alt="Pump" />
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <Vendor/>

      <Footer />
    </>
  );
};

export default Agventure;
