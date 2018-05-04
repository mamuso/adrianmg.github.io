/*
HOME
*/
let arrow = document.querySelector(".home-intro-scroll");
const arrowTreshold = 100; // when stops being visible
const experience = document.querySelector("#years");
const navWork = document.querySelector(".navigation [href='#home-work']");

// years of experience
if (experience !== null) {
  experience.textContent = new Date().getFullYear() - 2007;
}

// click on navigation 'work' and scroll
navWork.addEventListener("click", function(e) {
  scrollToItem(document.querySelector("#home-work"), 500);

  e.preventDefault();
  return false;
});

// scroll hint
function showScrollHint(seconds) {
  if (arrow && document.scrollingElement.scrollTop <= arrowTreshold) {
    setTimeout(function() {
      arrow.classList.add("visible");
    }, seconds * 1000);
  }
}

// hide scroll hint
document.addEventListener("scroll", scrollHandler);

function scrollHandler() {
  let scroll = document.scrollingElement.scrollTop;

  if (scroll >= arrowTreshold && arrow) {
    arrow.classList.remove("visible");

    document.removeEventListener("scroll", scrollHandler);
    // remove element after transition (avoid dealing with event handling + transitionend)
    setTimeout(function() {
      arrow.parentNode.removeChild(arrow);
      arrow = false;
    }, 400);
  }
}

/*
  HELPERS
*/

// Scrolling function from A -> B (modified from: https://bit.ly/2H3JKMV)
function scrollToItem(destination, duration = 200) {
  const start = window.pageYOffset;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName("body")[0].clientHeight;
  const destinationOffset =
    typeof destination === "number" ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  );

  if ("requestAnimationFrame" in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    return;
  }

  function scroll() {
    const now =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = 0.5 * (1 - Math.cos(Math.PI * time));
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    );

    if (window.pageYOffset === destinationOffsetToScroll) {
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}
