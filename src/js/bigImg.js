import refs from './refs.js';

import images from "../js/gallery-items.js";

refs.linkBigImg.addEventListener("click", onOpenBigImages);
variables.closeModalBtn.addEventListener("click", onCloseBigImages);
variables.overlayEl.addEventListener("click", onBackdropClick);

let activSlideIndex = null;
let imagesLength = images.length - 1;

function onOpenBigImages(evt) {
  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onFlipsImage);

  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  variables.openModal.classList.add("is-open");

  const imgAlt = evt.target.getAttribute("alt");
  const imgBigSrc = evt.target.dataset.source;

  if (variables.openModal.closest(".is-open")) {
    updateAttrModal(imgBigSrc, imgAlt);
  }
}

function onCloseBigImages() {
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onFlipsImage);
  variables.openModal.classList.remove("is-open");
  updateAttrModal();
  activSlideIndex = null;
}

function onBackdropClick(evt) {
  if (evt.target === evt.currentTarget) {
    onCloseBigImages();
  }
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = "Escape";

  if (evt.code === ESC_KEY_CODE) {
    onCloseBigImages();
  }
}

function getActivIndex(evt) {
  let currentImg = evt.target.getAttribute("href");
  return images.findIndex((imag) => currentImg === imag.original);
}

function onFlipsImage(evt) {
  //получаем индекс активного слайда если переменная activSlideIndex хранит null
  if (activSlideIndex === null) activSlideIndex = getActivIndex(evt);

  if (evt.code === "ArrowLeft") activSlideIndex -= 1;
  else if (evt.code === "ArrowRight") activSlideIndex += 1;

  if (activSlideIndex <= 0) activSlideIndex = imagesLength;
  else if (activSlideIndex >= imagesLength) activSlideIndex = 0;

  const i = images[activSlideIndex];
  updateAttrModal(i.original, i.description);
}

//универсальная функция которая обновляет попап
function updateAttrModal(src = "", alt = "") {
  variables.imgOflitebox.alt = alt;
  variables.imgOflitebox.src = src;
}
© 2021 GitHub, Inc.