import React, { useEffect } from 'react';
import 'wowjs/css/libs/animate.css';
import { WOW } from 'wowjs';
import aboutImage from '../assets/images/about.jpg'; // Adjust the path as per your directory structure


const AboutUs = () => {
  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="section-title position-relative pb-3 mb-5">
              <h5 className="fw-bold text-success text-uppercase">About Us</h5>
              <h1 className="mb-0">Innovative Solutions for Agricultural Excellence: Where Tech Meets Farm</h1>
            </div>
            <p className="mb-4">
              Agrowtein Labs is a pioneering agritech startup specializing in agricultural automation. Our focus is on delivering cutting-edge solutions for businesses and individuals keen on advancing technological innovations within the agricultural sector. Offering a comprehensive array of services and products, we assist clients in realizing their agricultural goals through custom design and fabrication, engineering analysis, project management, and more. Leveraging our extensive experience and expertise, we transform your ideas into reality. Our team of skilled engineers collaborates with you to craft tailored solutions, ensuring they align precisely with your agricultural requirements. With our advanced technology and proven track record, you can trust us to consistently deliver top-notch results. Committed to excellence, we prioritize an unparalleled level of customer service and satisfaction, ensuring your experience with our services is nothing short of exceptional.
            </p>
            <div className="d-flex align-items-center mb-4 wow fadeIn" data-wow-delay="0.6s">
              <div className="bg-success d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                <a href="tel:+91 9562603120" className="phone-link">
                  <i className="fa fa-phone-alt text-white"></i>
                </a>
              </div>
              <div className="ps-4">
                <h5 className="mb-2">Call to ask any question</h5>
                <h4 className="text-success mb-0">+91 956 260 3120</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-5" style={{ minHeight: '500px' }}>
            <div className="position-relative h-100">
              <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src={aboutImage} style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
