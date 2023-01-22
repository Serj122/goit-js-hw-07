import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryCards = createGallery(galleryItems);

galleryContainer.innerHTML = galleryCards;
galleryContainer.addEventListener("click", onSmallImageClick);

function createGallery(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
         <a class="gallery__link" href="${original}">
         <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
         />
        </a>
        </div>`
    )
    .join("");
}

function onSmallImageClick(evt) {
  evt.preventDefault();

  const isImage = evt.target.classList.contains("gallery__image");
  if (!isImage) {
    return;
  }

  openModalBigImage(evt.target.dataset.source);
}

function openModalBigImage(url) {
  const closeModal = (evt) => {
    if (evt.code === "Escape") {
      bigImage.close();
    }
  };

  const bigImage = basicLightbox.create(
    `
		<img src="${url}">`,
    {
      onShow: (bigImage) => document.addEventListener("keydown", closeModal),
      onClose: (bigImage) =>
        document.removeEventListener("keydown", closeModal),
    }
  );
  bigImage.show();
}
