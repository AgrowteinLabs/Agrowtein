import React, { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'wowjs/css/libs/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WOW } from 'wowjs';
import $ from 'jquery';
import 'owl.carousel';
import Topbar from './Topbar';
import Navbar from './Navbar';
import Carousel from './Carousel';
import AboutUs from './AboutUs'
import Features from './Features'
import Services from './Services';
import Contact from './Quote';
import Team from './Team'
import Vendor from './Vendor';
import Footer from './Footer'
import './Navbar.css';
import Blogs from './Blogs';

const Home = () => {
  useEffect(() => {
    new WOW().init();
    
    // Ensure jQuery is globally available
    const jQuery = window.$ || $;
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
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <Carousel />
      <AboutUs />
      <Features />
      <Services />
      <Contact />
      <Blogs/>
      <Team />
      <Vendor />
      <Footer />
    </>
  );
};

export default Home;
