import gsap from "./gsap/src/all.js";
import Draggable from "./gsap/src/Draggable.js"; /// a Rappler de mettre fin d'extension au memont de l'import///
import ScrollTrigger from "./gsap/src/ScrollTrigger.js";
gsap.registerPlugin(Draggable, ScrollTrigger);
//importation des effets dans ce js vous trouvez "Draggable" et "Srolltriger" de la libary GSAP//
import lodashThrottle from "https://cdn.skypack.dev/lodash.throttle@4.1.1";

const scrollContainer = document.querySelector("[data-scroller]");
const sections = gsap.utils.toArray("section");
const track = document.querySelector("[data-draggable]");
const navLinks = gsap.utils.toArray("[data-link]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
///reduce motion car l'script au debut et trop lourd///
const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth;

const getUseableHeight = () =>
  document.documentElement.offsetHeight - window.innerHeight;

const getDraggableWidth = () => {
  return track.offsetWidth * 0.5 - lastItemWidth();
};

const updatePosition = () => {
  const left = track.getBoundingClientRect().left * -1;
  const width = getDraggableWidth();
  const useableHeight = getUseableHeight();
  const y = gsap.utils.mapRange(0, width, 0, useableHeight, left);

  st.scroll(y);
};

const tl = gsap.timeline().to(track, {
  x: () => getDraggableWidth() * -1,
  ease: "none",
});

const st = ScrollTrigger.create({
  animation: tl,
  scrub: 0,
});
// function drag pour attraper le le slider pris sur la librery gasp//* */
const draggableInstance = Draggable.create(track, {
  type: "x",
  inertia: true,
  bounds: {
    minX: 0,
    maxX: getDraggableWidth() * -1,
  },
  edgeResistance: 1,
  onDragStart: () => st.disable(),
  onDragEnd: () => st.enable(),
  onDrag: updatePosition,
  onThrowUpdate: updatePosition,
});

const initSectionAnimation = () => {
  /* ce script ces't pour reduire la motoin "pas trop lourde"*/
  if (prefersReducedMotion.matches) return;

  sections.forEach((section, index) => {
    const heading = section.querySelector("h2");
    const image = section.querySelector(".section__image");

    /* Debut d'animation comment ell va commenece */
    gsap.set(heading, {
      opacity: 0,
      y: 50,
    });
    gsap.set(image, {
      opacity: 0,
      rotateY: 15,
    });

    /* Creation de le "Timeline" */
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => "top center",
        end: () => `+=${window.innerHeight}`,
        toggleActions: "play reverse play reverse",
        toggleClass: "is-active",
        markers: true,
      },
    });

    sectionTl
      .to(image, {
        //rotation de l'image sur le container//
        opacity: 1,
        rotateY: -5,
        duration: 6,
        ease: "elastic",
      })
      .to(
        heading,
        {
          opacity: 1,
          y: 0,
          duration: 2,
        },
        0.5
      );

    /* creation d'une nouvell timeline pour mettre une nouvel class au moment au on est*/
    const sectionTl2 = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 20px",
        end: () => `bottom top`,
        toggleActions: "play none play reverse",
        onToggle: ({ isActive }) => {
          const sectionLink = navLinks[index];

          if (isActive) {
            sectionLink.classList.add("is-active");
          } else {
            sectionLink.classList.remove("is-active");
          }
        },
      },
    });
  });
};

initSectionAnimation();

/*cette script active la navigation avec le clavier avec le TAB*/
track.addEventListener("keyup", (e) => {
  const id = e.target.getAttribute("href");
  if (!id || e.key !== "Tab") return;

  const section = document.querySelector(id);
  const y = section.getBoundingClientRect().top + window.scrollY;

  st.scroll(y);
});
/// A rajouter que cette option et optional t en peut  mettre de different cle///*
