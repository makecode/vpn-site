import Glider from 'glider-js';

// styles import
import 'ress';
import './styles/index.sass';
import 'glider-js/glider.min.css';

const headerFixedClass = 'header-fixed';

$(document).ready(function() {
  const header = document.getElementById('header');
  const headerOffset = 36;
  const mobile = 900;

  const onScroll = (event) => {
    const topOffset = window.pageYOffset;

    if (topOffset >= headerOffset) {
      header.className = `header fixed`;
    } else if (topOffset >= 250) {
      header.className = `header hidden`;
    } else {
      header.className = `header`;
    }
  }

  const onResize = (event) => {
    runSlider();
  }

  const runSlider = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= mobile) {
      new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        dots: '#dots',
        draggable: false
      });
    }
  };

  runSlider();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
});
