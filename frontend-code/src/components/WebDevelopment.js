import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import webImage from '../assets/images/Web.jpg'; // Add your image file paths here
import Vendor from './Vendor';
import HeaderSection from './HeaderSection';

const WebDevelopment = () => {
    const breadcrumb = [
        { label: 'Home', link: '/' },
        { label: 'Products and Services', link: '/products' },
        { label: 'Web Development', link: '/web' }
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
                <h5 className="fw-bold text-success text-uppercase">WEB DEVELOPMENT</h5>
                <h1 className="mb-0">Transform your digital presence with our expert Web Development services.</h1>
              </div>
              <p className="mb-4">
                Welcome to Agrowtein's Web Development Services!
                <br />
                <br />
                At Agrowtein, we specialize in crafting dynamic and engaging online experiences tailored to meet your business needs. Our comprehensive web development solutions are designed to elevate your digital presence, enhance user engagement, and drive meaningful results for your brand.
                <br />
                <br />
                Our team of skilled developers utilizes cutting-edge technologies and industry best practices to deliver custom websites that not only look stunning but also function seamlessly across all devices and platforms. Whether you're a small startup or a large enterprise, we have the expertise to bring your vision to life.
                <br />
                <br />
                What sets Agrowtein apart:
                <br />
                <br />
                <strong>Customized Solutions:</strong> We understand that every business is unique. That's why we take a personalized approach to web development, ensuring that your website reflects your brand identity and meets your specific requirements.
                <br />
                <br />
                <strong>Responsive Design:</strong> In today's mobile-first world, responsive design is non-negotiable. We prioritize user experience by creating websites that adapt seamlessly to any screen size, providing a consistent and intuitive browsing experience for your visitors.
                <br />
                <br />
                <strong>Scalability:</strong> As your business grows, so should your website. Our scalable web development solutions are built to evolve with your needs, allowing for easy integration of new features and functionalities as your business expands.
                <br />
                <br />
                <strong>Performance Optimization:</strong> Slow-loading websites can drive visitors away. That's why we optimize every aspect of your site for speed and performance, ensuring fast load times and smooth navigation for optimal user satisfaction.
                <br />
                <br />
                <strong>SEO-Friendly:</strong> A beautiful website is only effective if it can be found. Our developers incorporate SEO best practices into every project, helping your website rank higher in search engine results and attract more organic traffic.
                <br />
                <br />
                <strong>Ongoing Support:</strong> Our commitment to your success doesn't end with the launch of your website. We provide ongoing support and maintenance services to keep your site running smoothly and securely, allowing you to focus on growing your business.
                <br />
                <br />
                Whether you need a simple brochure site, an e-commerce platform, or a complex web application, Agrowtein has the expertise and dedication to deliver exceptional results. Let us help you unlock the full potential of your online presence and take your business to new heights.
                <br />
                <br />
                Contact us today to learn more about our web development services and how we can help you achieve your digital goals.
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
                <img className="position-absolute w-100 h-100 rounded wow zoomIn" data-wow-delay="0.9s" src={webImage} style={{ objectFit: 'cover' }} alt="Web Development" />
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

export default WebDevelopment;
