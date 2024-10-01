let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const navbarHeight = navbar.offsetHeight;

function handleScroll() {
  const scrollTop =
    window.scrollY || // Modern browsers
    document.documentElement.scrollTop || // Firefox and IE
    document.body.scrollTop; // Legacy fallback for Safari

  if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
    // Scrolling down & past navbar height
    navbar.style.top = `-${navbarHeight}px`;
  } else {
    // Scrolling up or at the top
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop;
}

window.addEventListener('scroll', handleScroll, { passive: true });
