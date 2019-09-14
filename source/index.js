// libs
// import Glider from 'glider-js';

// styles import
import 'ress';
import './styles/_index.sass';
import 'glider-js/glider.min.css';

$(document).ready(function() {
  const mobile = 900;// min window width for mobile
  const detectedBodyClass = 'detected';
  let isMobile = null;
  let headerOffset = null;

  // DOM elements
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const body = document.getElementById('body');
  const vawes = document.getElementById('vawes');
  const downloadBtn = document.getElementById('download-btn');
  const onScreen = document.getElementById('on-screen');

  $(downloadBtn).on('click', function(e) {
    e.preventDefault();
    $(onScreen).addClass('visible');
  });

  $(onScreen).on('click', function() {
    $(onScreen).removeClass('visible');
  });

  // check if is mobile window size
  const checkMobile = () => {
    isMobile = window.innerWidth <= mobile;
  };

  // check header offset
  // if we have detection block on the page - offset = 36px
  const checkHeaderOffset = () => {
    headerOffset = $(body).hasClass(detectedBodyClass) && !isMobile ? 36 : 0;
  };

  // on hamburger click
  $(hamburger).on('click', function() {
    $(body).toggleClass('menu-opened');
    $(hamburger).toggleClass('menu-opened');
  });

  // on plan click
  $('.plan').map((index, el) => {
    $(el).click(function () {
      $('.plan.active').removeClass('active');
      $(this).addClass('active');
    });
  });

  // on scroll page callback
  const onScroll = (event) => {
    const topOffset = window.pageYOffset;

    if (topOffset >= headerOffset) {
      header.className = `header fixed`;
    } else {
      header.className = `header`;
    }
  };

  // on resize window callback
  const onResize = (event) => {
    checkMobile();
    checkHeaderOffset();
    runSlider();
  };

  // Glider initialization
  const initSlider = () => {
    new Glider(document.querySelector('.glider'), {
      slidesToShow: 1,
      dots: '#dots',
      draggable: false
    });
  };

  // run glider only for mobile on index page
//   const runSlider = () => {
//     const pageIsIndex = $(body).hasClass('index');
//     if (pageIsIndex && isMobile) {
//       initSlider();
//     }
//   };

  // show vawes SVG
  const showVawes = () => {
    $(vawes).fadeIn(2000);
  };

  // run fuctions and listeners
  checkMobile();
  checkHeaderOffset();
//   runSlider();
  setTimeout(showVawes, 1000);
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
});
