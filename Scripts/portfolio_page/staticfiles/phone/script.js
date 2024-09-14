window.addEventListener("scroll", function () {
  const topSection = document.querySelector(".t-sec");
  const bottomSection = document.querySelector(".b-sec");
  const main = document.querySelector("main");
  const topSectionHeight = topSection.offsetHeight;

  if (window.scrollY >= topSectionHeight) {
    bottomSection.classList.add("fixed");
    main.classList.add("padtop");
  } else {
    bottomSection.classList.remove("fixed");
    main.classList.remove("padtop");
  }
});
