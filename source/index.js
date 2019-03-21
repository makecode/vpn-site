import 'ress';
import './styles/index.sass';

const headerFixedClass = 'header-fixed';

$(document).ready(function() {
  const header = document.getElementById('header');
  const headerOffset = 700;

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

  window.addEventListener('scroll', onScroll);
});

