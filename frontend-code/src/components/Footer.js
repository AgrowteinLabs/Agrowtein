import React, { useEffect } from 'react';
import 'wowjs/css/libs/animate.css';
import { WOW } from 'wowjs';

// Import the logo image
import logo from '../assets/images/Logo png w.png'; // Adjust the path as per your directory structure

const Footer = () => {
  useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div>
      <div className="container-fluid bg-dark text-light mt-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-4 col-md-6 footer-about">
              <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 bg-success p-4">
                <a href="/" className="navbar-brand p-0">
                  <img src={logo} alt="Agrowtein" className="me-2" width="200" height="50" />
                </a>
                <form action="">
                  <div className="input-group">
                    <input type="text" className="form-control border-black p-3" placeholder="Your Email" />
                    <button className="btn btn-dark">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <div className="row gx-5">
                <div className="col-lg-7 col-md-12 pt-5 mb-5">
                  <div className="section-title section-title-sm position-relative pb-3 mb-4">
                    <h3 className="text-light mb-0">Get In Touch</h3>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-geo-alt text-success me-2"></i>
                    <p className="mb-lg-0">Startup Valley TBI,Kanjirappally</p>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-envelope-open text-success me-2"></i>
                    <p className="mb-0">info@agrowtein.com</p>
                  </div>
                  <div className="d-flex mb-2">
                    <i className="bi bi-telephone text-success me-2"></i>
                    <p className="mb-0">+91 95626 03120</p>
                  </div>
                  <div className="d-flex mt-4">
                    <a className="btn btn-success btn-square me-2" href="#">
                      <i className="fab fa-twitter fw-normal"></i>
                    </a>
                    <a className="btn btn-success btn-square me-2" href="#">
                      <i className="fab fa-facebook-f fw-normal"></i>
                    </a>
                    <a className="btn btn-success btn-square me-2" href="https://www.linkedin.com/company/agrowteinlabs">
                      <i className="fab fa-linkedin-in fw-normal"></i>
                    </a>
                    <a className="btn btn-success btn-square" href="#">
                      <i className="fab fa-instagram fw-normal"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                  <div className="section-title section-title-sm position-relative pb-3 mb-4">
                    <h3 className="text-light mb-0">Quick Links</h3>
                  </div>
                  <div className="link-animated d-flex flex-column justify-content-start">
                    <a className="text-light mb-2 no-underline" href="/">
                      <i className="bi bi-arrow-right text-success me-2"></i>Home
                    </a>
                    <a className="text-light mb-2 no-underline" href="/about">
                      <i className="bi bi-arrow-right text-success me-2"></i>About Us
                    </a>
                    <a className="text-light mb-2 no-underline" href="/service">
                      <i className="bi bi-arrow-right text-success me-2"></i>Products & Services
                    </a>
                    <a className="text-light mb-2 no-underline" href="/team">
                      <i className="bi bi-arrow-right text-success me-2"></i>Meet The Team
                    </a>
                    <a className="text-light mb-2 no-underline" href="/blog">
                      <i className="bi bi-arrow-right text-success me-2"></i>Latest Blog
                    </a>
                    <a className="text-light no-underline" href="/contact">
                      <i className="bi bi-arrow-right text-success me-2"></i>Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid text-white" style={{ background: '#061429' }}>
        <div className="container text-center">
          <div className="row justify-content-end">
            <div className="col-lg-8 col-md-6">
              <div className="d-flex align-items-center justify-content-center" style={{ height: '75px' }}>
                <p className="mb-0">
                  &copy; <a className="text-white border-bottom no-underline" href="#">Agrowtein Labs Pvt Ltd</a>. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/" className="btn btn-lg btn-success btn-lg-square rounded back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
};

export default Footer;
