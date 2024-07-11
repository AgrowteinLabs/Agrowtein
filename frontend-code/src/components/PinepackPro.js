import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import pineImage from '../assets/images/pine.jpg'; // Add your image file paths here
import Vendor from './Vendor';
import HeaderSection from './HeaderSection';

const PinepackPro = () => {
    const breadcrumb = [
        { label: 'Home', link: '/' },
        { label: 'Products and Services', link: '/products' },
        { label: 'Pinepack Pro', link: '/pinepack' }
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
                <h5 className="fw-bold text-success text-uppercase">PINEPACK PRO: Pineapple Sapling Bundling System</h5>
                <h1 className="mb-0">Revolutionize your pineapple cultivation with our state-of-the-art sapling bundling machine.</h1>
              </div>
              <p className="mb-4">
                In the picturesque landscapes of Kerala, where pineapple cultivation thrives across 15,000 hectares yielding approximately 25,000 pineapples per hectare, farmers grapple with a significant challenge—the labor-intensive and time-consuming process of bundling pineapple saplings, accentuated by the spiky leaves. In response to this agricultural bottleneck, our product PinePack Pro: Pineapple Sapling Bundling System emerges as a groundbreaking solution, aimed at revolutionizing and enhancing the efficiency of this crucial task.
                <br />
                <br />
                This innovative machine, designed with precision and care, seeks to alleviate the burdens faced by cultivators by reducing labor efforts, minimizing transportation costs, and enhancing overall productivity in the delicate handling of pineapple saplings. With a dual focus on reducing transportation costs, the system enables tight bundling for cattle feed purposes, optimizing bundle size and allowing for the transportation of more bundles in a single vehicle. For replantation, the equipment efficiently bundles saplings with reduced sizes, streamlining the process and increasing cost-effectiveness.
                <br />
                <br />
                Moreover, the system significantly reduces manual labor, making it not only efficient but also accessible to a broader demographic, including the engagement of more female employees in the agricultural sector. Addressing labor shortages, the Pineapple Sapling Bundling System is designed to attract a diverse workforce, promoting inclusivity. Its user-friendly design ensures easy operation, making it a valuable tool for farmers. This innovative solution, which operates without external power, emphasizes energy efficiency and represents a pivotal step towards automation in the farming sector.
                <br />
                <br />
                As pineapple cultivators in Kerala embrace this technology, we envision a future where the marriage of innovation and agriculture propels the industry forward, bringing sustainable solutions and economic empowerment to farmers across the region.
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
                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src={pineImage} style={{ objectFit: 'cover' }} alt="Pineapple Sapling Bundling System" />
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

export default PinepackPro;
