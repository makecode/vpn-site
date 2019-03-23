// libs
import Glider from 'glider-js';

// styles import
import 'ress';
import './styles/_index.sass';
import 'glider-js/glider.min.css';

$(document).ready(function() {
  const mobile = 900;// min window width for mobile
  let isMobile = null;
  let headerOffset = null;

  // DOM elements
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const body = document.getElementById('body');

  // check if is mobile window size
  const checkMobile = () => {
    isMobile = window.innerWidth <= mobile;
    headerOffset = isMobile ? 0 : 36;
    console.log('IS MOBILE', isMobile);
  };

  // on hamburger click
  $(hamburger).on('click', function() {
    $(body).toggleClass('menu-opened');
    $(hamburger).toggleClass('menu-opened');
  });

  // on scroll page callback
  const onScroll = (event) => {
    const topOffset = window.pageYOffset;
    console.log('HEADER OFFSET', headerOffset)
    if (topOffset >= headerOffset) {
      header.className = `header fixed`;
    } else {
      header.className = `header`;
    }
  }

  // on resize window callback
  const onResize = (event) => {
    checkMobile();
    runSlider();
  }

  // Glider initialization
  const initSlider = () => {
    new Glider(document.querySelector('.glider'), {
      slidesToShow: 1,
      dots: '#dots',
      draggable: false
    });
  }

  // run glider only for mobile
  const runSlider = () => {
    if (isMobile) {
      initSlider();
    }
  };

  // run fuctions and listeners
  checkMobile();
  runSlider();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
});
