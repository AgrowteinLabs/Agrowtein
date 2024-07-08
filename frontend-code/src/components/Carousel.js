import React, { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import 'owl.carousel';
import pumpImage from '../assets/images/pump 5.jpg';
import pineappleImage from '../assets/images/pineapple.jpg'; // Ensure this path is correct

const Carousel = () => {
  useEffect(() => {
    // Ensure jQuery is globally available
    const jQuery = window.$ || $;

    const carouselElement = jQuery('.carousel');

    // Initialize carousel
    carouselElement.owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
    });

    // Cleanup function to destroy the carousel on unmount
    return () => {
      carouselElement.trigger('destroy.owl.carousel');
    };
  }, []);

  return (
    <div className="carousel owl-carousel">
      <div className="item">
        <img className="w-100" src={pumpImage} alt="Agventure" />
        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
          <div className="p-3" style={{ maxWidth: '900px' }}>
            <h5 className="text-white text-uppercase mb-3 animated slideInDown">Innovation & Technology</h5>
            <h1 className="display-1 text-white mb-md-4 animated zoomIn">Agventure: Innovative Water Pump</h1>
            <a href="/contact" className="btn btn-success py-md-3 px-md-5 me-3 animated slideInLeft" style={{ color: '#ffffff' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#ffffff'}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <div className="item">
        <img className="w-100" src={pineappleImage} alt="PinePack Pro" />
        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
          <div className="p-3" style={{ maxWidth: '900px' }}>
            <h5 className="text-white text-uppercase mb-3 animated slideInDown">Innovation & Technology</h5>
            <h1 className="display-1 text-white mb-md-4 animated zoomIn">PinePack Pro: Pineapple Sapling Bundling System</h1>
            <a href="/contact" className="btn btn-success py-md-3 px-md-5 me-3 animated slideInLeft" style={{ color: '#ffffff' }} onMouseOver={(e) => e.target.style.color = '#000'} onMouseOut={(e) => e.target.style.color = '#ffffff'}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
