//Get the button
const topButton = document.querySelector('#btn-back-to-top');

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Get the scroll position from different properties depending on browser support
  const scrollPosition =
    window.scrollY || // Modern browsers
    document.documentElement.scrollTop || // Firefox and IE
    document.body.scrollTop; // Legacy fallback for Safari

  // Show or hide the button based on the scroll position
  if (scrollPosition > 100) {
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
topButton.addEventListener('click', backToTop);

function backToTop() {
  // Scroll to the top of the document with a smooth scrolling effect
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
