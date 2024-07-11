import React, { useState } from 'react';
import 'wowjs/css/libs/animate.css';
import { WOW } from 'wowjs';

const Quote = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  React.useEffect(() => {
    new WOW().init();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="section-title position-relative pb-3 mb-5">
              <h5 className="fw-bold text-success text-uppercase">Contact Us</h5>
              <h1 className="mb-0">Have any Questions? Please Feel Free to Contact Us</h1>
            </div>
            <div className="row gx-3">
              <div className="col-sm-6 wow zoomIn" data-wow-delay="0.2s">
                <h5 className="mb-4"><i className="fa fa-reply text-success me-3"></i>Reply within 24 hours</h5>
              </div>
              <div className="col-sm-6 wow zoomIn" data-wow-delay="0.4s">
                <h5 className="mb-4"><i className="fa fa-phone-alt text-success me-3"></i>24 hrs telephone support</h5>
              </div>
            </div>
            <p className="mb-4">
              Have questions, comments, or inquiries? <br />
              <br />
              We'd love to hear from you! Our dedicated team is ready to assist you. Reach out to us through the following channels: <br />
              <br />
              Email: info@agrowtein.com<br />
              Phone: +91 956 260 3120 <br />
              <br />
              Feel free to fill out the contact form below, and we'll get back to you as soon as possible.<br />
              Thank you for considering <strong>Agrowtein Labs Private Limited</strong> where customer satisfaction is our priority.
            </p>
            <div className="d-flex align-items-center mt-2 wow zoomIn" data-wow-delay="0.6s">
              <div className="bg-success d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                <a href="tel:+91 9562603120" className="phone-link">
                  <i className="fa fa-phone-alt text-white"></i>
                </a>
              </div>
              <div className="ps-4">
                <h5 className="mb-2">Call to ask any question</h5>
                <h4 className="text-success mb-0">+91 956 0260 3120</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="bg-success rounded h-100 d-flex align-items-center p-5 wow zoomIn" data-wow-delay="0.9s">
              <form action="https://getform.io/f/14efa7ff-343b-40c6-bcd2-d694a95d6afd" method="post">
                <div className="row g-3">
                  <div className="col-xl-12">
                    <input type="text" className="form-control bg-light border-0" placeholder="Your Name" style={{ height: '55px' }} name="name" required />
                  </div>
                  <div className="col-12">
                    <input type="email" className="form-control bg-light border-0" placeholder="Your Email" style={{ height: '55px' }} name="email" required />
                  </div>
                  <div className="col-12">
                    <select value={selectedOption} onChange={handleChange} className="form-select bg-light border-0" style={{ height: '55px' }} name="option" required>
                      <option value="Option 1">Agventure</option>
                      <option value="Option 2">Ojes Battery</option>
                      <option value="Option 3">Pinepack Pro</option>
                      <option value="Option 4">Drone Hub</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <textarea className="form-control bg-light border-0" rows="3" placeholder="Message" name="message" required></textarea>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-secondary w-100 py-3" type="submit">Get Details</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
