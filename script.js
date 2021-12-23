'use strict';

///////////////////////////////////////
// Modal window
const enter = function (pass = 0) {
  pass = prompt('enter password');
  if (pass !== '0504244342') {
    enter(pass);
  }
};
enter(0);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//Smoothing scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: `smooth` });
});

//////Not efficient way to scroll all links//////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //prevent the jumping to the ancors #section--$
//     //console.log('link', e.target);
//     const id = this.getAttribute('href');
//     console.log(id); //returns section--1 /section--2 /section--3
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//1. addEventListener to common parent element
//2.Determine what element originated the event
document.querySelector(`.nav__links`).addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Originated element: ', e.target);

  //matching startegy
  if (e.target.classList.contains('nav__link')) {
    console.log('link');
    const id = e.target.getAttribute('href');
    console.log(id); //returns section--1 /section--2 /section--3
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//Tabbed component
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
//Add event handlers to the component tabs
//tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))); //better use event delagation
//Delagtion
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //Guard Clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //Activate content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//Menu fade animation links and logo
const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = 0.5;
//       }
//       logo.style.opacity = 0.5;
//     });
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = 0.5;
//       }
//       logo.style.opacity = 0.5;
//     });
//   }
// });
//lets use bind method
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////Lectures/////
//SELECTING ELEMENTS
//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
//console.log(allSections);
const section1 = document.getElementById('section--1');
//console.log(section1);
const allBtns = document.getElementsByTagName('button');
// console.log(allBtns);
//console.log(document.getElementsByClassName('btn'));

//Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = `We use cookies for improved functionality and analytics.`;
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
//header.append(message);
//header.append(message.cloneNode(true));
//header.before(message);
//header.after(message);

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//styles

message.style.backgroundColor = `#37383d`;
message.style.width = `120%`;

//sticky navigation - this way is bad for performance
//

// //stiky navigation using the intersetion observer API
// const obsCallback = function (enteries, observer) {
//   enteries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null, //null- observe the entire viewport
//   //treshhold: 0.1, //10%, can have an array of treshholds

//   treshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
//const header = document.querySelector('.header');
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-120px',
});
headerObserver.observe(header);

//Reveal Sections
//const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  treshhold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
const imgTargets = document.querySelectorAll(`img[data-src]`);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  treshhold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(Img => imgObserver.observe(Img));
//SLIDERS//
const slides = document.querySelectorAll('.slide');
const btnSlideLeft = document.querySelector(`.slider__btn--left`);
const btnSlideRight = document.querySelector(`.slider__btn--right`);
let currentSlide = 0;
const maxSlide = slides.length;
const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2) translateX(-1500px)';
// slider.style.overflow = 'visible';

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
  activateDot(slide);
};
//Previous slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};
btnSlideLeft.addEventListener('click', prevSlide);
//Next slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};
btnSlideRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  }
  e.key === 'ArrowRight' && nextSlide();
});
const dotsContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    //const slide = e.target.dataset.slide; lets destructure
    const { slide } = e.target.dataset;
    //console.log(slide);
    goToSlide(slide);
  }
});
createDots();
goToSlide(0);
document.addEventListener('DOMContentLoaded', function (e) {
  //if script tag is last loaded in the HTML no neccesarry to listen the DOMcontentLoaded
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded:', e);
});
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
//returns nothing , just inline styles return value
//console.log(message.style.backgroundColor); //returns rgb(55, 56, 61)

//console.log(getComputedStyle(message)); //contains all the properties and values
//console.log(getComputedStyle(message).color); //get by calculating - returns rgb(187, 187, 187)
//console.log(getComputedStyle(message).height); //get by calculating - returns49px
//(message.style.height =
//  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px')
//)
//);
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');
logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt); //returns Bankist logo
// console.log(logo.src); //returns http://127.0.0.1:5500/img/logo.png
// console.log(logo.designer); //returns unidentified because is not standard property and we add it by ourselves
// console.log(logo.getAttribute('designer')); //returns Jonas;
// console.log(logo.className); //returns nav__logo
logo.alt = 'Beautiful minimalist logo';
//console.log(logo.alt); //returns Beautiful minimalist logo
logo.setAttribute('company', 'Bankist');
//console.log(logo.getAttribute(`src`)); //returns img/logo.png
const link = document.querySelector(`.twitter-link`);
// console.log(link.href); //returns https://twitter.com/jonasschmedtman
// console.log(link.getAttribute('href')); //returns https://twitter.com/jonasschmedtman
const link2 = document.querySelector(`.nav__link--btn`);
// console.log(link2.href); //returns http://127.0.0.1:5500/index.html#
// console.log(link2.getAttribute('href')); //returns #

//Data attributes
// console.log(logo.dataset.versionNumber); //returns 3.0

//Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes
//Dont use logo.classname='jonas'

// //Smoothing scroll
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// //const section1 = document.querySelector(`#section--1`);
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords); //returns DOMRect {x: 0, y: 769.7777709960938, width: 1219.5555419921875, height: 1400.1666259765625, top: 769.7777709960938, …}
//   console.log(e.target.getBoundingClientRect()); //returns DOMRect {x: 34.77777862548828, y: 542.763916015625, width: 109.97222137451172, height: 28.77777862548828, top: 542.763916015625, …}
//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //gives how much scroll in x and y coordinates
//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   ); //returns the height and width of the viewport
//   //window.scrollTo(s1coords.left, s1coords.top); //top and left is always relative to the viewport
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   //modern way not working all browsers
//   section1.scrollIntoView({ behavior: `smooth` });
// });

// //TYPE OF EVENTS and EVENTS HANDLERS
// const alertH1 = function (e) {
//   alert('addEventListener: Great');
//   //h1.removeEventListener('mouseenter', alertH1); //OPTION1
// };
// const h1 = document.querySelector(`h1`);

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 3000); //OPTION 2

// //OPTION 3 in the HTML file <h1 onclick="alert('HTML alert')">
// // h1.onmouseenter = function (e) {
// //   alert('onmouseenter: Great!');
// // }; //old school coding

// //BUBBLING
// //random color rgb(0-255,0-255,0-255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// //CHECK console.log(randomColor());
// console.clear();
// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//   console.log(`nav__link: `, e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();

//   //stop event propagation
//   //e.stopPropagation();
// });
// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//   console.log(`nav__links: `, e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector(`.nav`).addEventListener(
//   `click`,
//   function (e) {
//     console.log(`nav: `, e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
//   },
//   false
// );
// //.addEventListener(option,function,true/false) true for navigation down the dom

// //Event delegation
// //Dom Travering
// const h1 = document.querySelector('h1');
// //Going downwards - selecting child elements
// console.clear;
// //console.log(h1.querySelectorAll('.highlight'));
// //console.log(h1.childNodes);
// //console.log(h1.children); //only direct children
// //h1.firstElementChild.style.color = `white`;
// //h1.lastElementChild.style.color = 'orangered';

// //going upwards - selecting parents
// // console.log(h1.parentNode);
// // console.log(h1.parentElement);
// // h1.closest('.header').style.background = `var(--gradient-secondary)`;
// // h1.closest(`h1`).style.background = 'var(--gradient-primary)';

// //sideways - only closest siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //to find all sibilings get by parent
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });
