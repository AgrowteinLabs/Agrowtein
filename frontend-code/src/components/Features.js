import React, { useEffect } from 'react';
import 'animate.css';
import { WOW } from 'wowjs';
import featureImage from '../assets/images/feature.jpg';

const Features = () => {
  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
          <h5 className="fw-bold text-success text-uppercase">Why Choose Us</h5>
          <h1 className="mb-0">Make the Smart choice by, Choosing us</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="row g-5">
              <div className="col-12 wow zoomIn" data-wow-delay="0.2s">
                <div className="bg-success rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-cubes text-white"></i>
                </div>
                <h4>1. Cutting-Edge Technology</h4>
                <p className="mb-0">
                  Agrowtein pioneers groundbreaking technological solutions in agricultural automation, leveraging state-of-the-art innovations such as IoT integration and advanced data analytics to revolutionize farming practices and maximize yields.
                </p>
              </div>
              <div className="col-12 wow zoomIn" data-wow-delay="0.6s">
                <div className="bg-success rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-award text-white"></i>
                </div>
                <h4>2. Sustainable Practices</h4>
                <p className="mb-0">
                  With a focus on sustainability, Agrowtein offers eco-friendly solutions that minimize environmental impact while maximizing long-term profitability for farmers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow zoomIn" data-wow-delay="0.9s" style={{ minHeight: '350px' }}>
            <div className="position-relative h-100">
              <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.1s" src={featureImage} style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row g-5">
              <div className="col-12 wow zoomIn" data-wow-delay="0.4s">
                <div className="bg-success rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-users-cog text-white"></i>
                </div>
                <h4>3. Expertise and Experience</h4>
                <p className="mb-0">
                  Backed by years of industry experience and a team of seasoned professionals, Agrowtein provides unparalleled expertise in agricultural automation, ensuring reliable and effective solutions for clients.
                </p>
              </div>
              <div className="col-12 wow zoomIn" data-wow-delay="0.8s">
                <div className="bg-success rounded d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="fa fa-shield-alt text-white"></i>
                </div>
                <h4>4. Customized Solutions</h4>
                <p className="mb-0">
                  Agrowtein collaborates closely with each client to understand their unique needs and challenges, delivering tailored solutions that address specific requirements and drive exponential growth in their agricultural businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
