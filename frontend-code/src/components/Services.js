import React, { useEffect } from 'react';
import 'wowjs/css/libs/animate.css';
import { WOW } from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { IoSpeedometerOutline, IoBasketOutline, IoLaptopOutline } from 'react-icons/io5'; // Import specific icons

const Services = () => {
  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '1000px' }}>
          <h5 className="fw-bold text-success text-uppercase">Products and Services</h5>
          <h1 className="mb-0">Embark on a Journey of Innovation and Technology with our Forward-thinking Solutions</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon">
                <IoSpeedometerOutline size="3em" color="#ffffff" /> {/* Use specific icon with white color */}
              </div>
              <h4 className="mb-3">AGVENTURE</h4>
              <p className="m-0">Experience the efficiency and versatility of our vertical axis tiltable water pump, designed to optimize agricultural irrigation with precision and ease.</p>
              <a className="btn btn-lg btn-success rounded-circle" href="/AGVENTURE">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon">
                <IoBasketOutline size="3em" color="#ffffff" /> {/* Use specific icon with white color */}
              </div>
              <h4 className="mb-3">PINEPACK PRO</h4>
              <p className="m-0">Revolutionize your pineapple cultivation with our state-of-the-art sapling bundling machine.</p>
              <a className="btn btn-lg btn-success rounded-circle" href="/pinepack">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.3s">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <div className="service-icon">
                <IoLaptopOutline size="3em" color="#ffffff" /> {/* Use specific icon with white color */}
              </div>
              <h4 className="mb-3">WEB DEVELOPMENT</h4>
              <p className="m-0">Elevate your online presence with our expert web development services, where innovation meets seamless user experiences for a digital landscape that stands out.</p>
              <a className="btn btn-lg btn-success rounded-circle" href="/web">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 offset-lg-4 wow zoomIn d-flex align-items-center justify-content-center" data-wow-delay="0.9s">
            <div className="position-relative bg-success rounded h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
              <h3 className="text-white mb-3">Call Us For Queries</h3>
              <p className="text-white mb-3">We value your feedback and inquiries. Getting in touch with us is easy!</p>
              <h2 className="text-white mb-0">+91 956 260 3120</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
