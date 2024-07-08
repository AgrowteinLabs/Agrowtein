import React, { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'wowjs/css/libs/animate.css';
import { WOW } from 'wowjs';
import $ from 'jquery';
import 'owl.carousel';

// Importing images
import icreateImg from '../assets/images/icreate.png';
import kovilakathImg from '../assets/images/Kovilakath.png';
import kufosImg from '../assets/images/KUFOS.png';
import nitImg from '../assets/images/NIT.png';
import kauImg from '../assets/images/KAU.png';
import ajceImg from '../assets/images/Ajce.png';

const Vendor = () => {
  useEffect(() => {
    new WOW().init();
    // Ensure jQuery is globally available
    const jQuery = window.$ || $;
    const initializeOwlCarousel = () => {
      jQuery('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
          0: { items: 2 },
          576: { items: 4 },
          768: { items: 6 },
          992: { items: 6 },
        },
      });
    };
    
    // Destroy existing carousel (if any) and reinitialize to ensure consistent behavior
    if (jQuery('.vendor-carousel').hasClass('owl-loaded')) {
      jQuery('.vendor-carousel').trigger('destroy.owl.carousel').removeClass('owl-loaded');
      jQuery('.vendor-carousel').find('.owl-stage-outer').children().unwrap();
    }

    initializeOwlCarousel();

  }, []);

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="section-title text-center position-relative pb-3 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h5 className="fw-bold text-success text-uppercase">Our Supporting Partners</h5>
      </div>
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5 mb-4">
          <div className="bg-white">
            <div className="owl-carousel vendor-carousel">
              <img src={icreateImg} alt="iCreate" />
              <img src={kovilakathImg} alt="Kovilakath" />
              <img src={kufosImg} alt="KUFOS" />
              <img src={nitImg} alt="NIT" />
              <img src={kauImg} alt="KAU" />
              <img src={ajceImg} alt="AJCE" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
