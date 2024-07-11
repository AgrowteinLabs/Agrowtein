import React from 'react';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WOW from 'wowjs';
// import '../assets/css/styles.css';

const ContactUs = () => {
  React.useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
          <h5 className="fw-bold text-success text-uppercase">Contact Us</h5>
          <h1 className="mb-0">If You Have Any Query, Feel Free To Contact Us</h1>
        </div>
        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.1s">
              <div className="bg-success d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                <i className="fa fa-phone-alt text-white"></i>
              </div>
              <div className="ps-4">
                <h5 className="mb-2">Call to ask any question</h5>
                <h4 className="text-success mb-0">+91 956 260 3120</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.4s">
              <div className="bg-success d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                <i className="fa fa-envelope-open text-white"></i>
              </div>
              <div className="ps-4">
                <h5 className="mb-2">Email to get Details</h5>
                <h4 className="text-success mb-0">info@agrowtein.com</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex align-items-center wow fadeIn" data-wow-delay="0.8s">
              <div className="bg-success d-flex align-items-center justify-content-center rounded" style={{ width: '60px', height: '60px' }}>
                <i className="fa fa-map-marker-alt text-white"></i>
              </div>
              <div className="ps-4">
                <h5 className="mb-2">Visit our office</h5>
                <h4 className="text-success mb-0">Startup Valley TBI</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-6 wow slideInUp" data-wow-delay="0.3s">
            <form action="https://getform.io/f/23a978c4-d6fd-4ef0-b2c0-d5954786a88b" method="post">
              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" className="form-control border-0 bg-light px-4" placeholder="Your Name" style={{ height: '55px' }} name="name" required />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control border-0 bg-light px-4" placeholder="Your Email" style={{ height: '55px' }} name="email" required />
                </div>
                <div className="col-12">
                  <input type="text" className="form-control border-0 bg-light px-4" placeholder="Subject" style={{ height: '55px' }} name="Subject" required />
                </div>
                <div className="col-12">
                  <textarea className="form-control border-0 bg-light px-4 py-3" rows="4" placeholder="Message" name="Message" required></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-success w-100 py-3" type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6 wow slideInUp" data-wow-delay="0.6s">
            <iframe
              className="position-relative rounded w-100 h-100"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d955.6906602056966!2d76.82245158537812!3d9.5281246979846!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0637c2e4cb6439%3A0xd7716af546178aef!2sStartups%20Valley%20TBI!5e0!3m2!1sen!2sus!4v1706787831549!5m2!1sen!2sus"
              frameBorder="0"
              style={{ minHeight: '350px', border: '0' }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
