import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerEl = document.querySelector('.gallery');
let modalImage;

insertGalleryCards(createGalleryGardsMarkup(galleryItems));
galleryContainerEl.addEventListener('click', onGalleryCardClick);

function createGalleryCard(previewImg, originalImg, desc) {
  return `<div class="gallery__item">
  <a class="gallery__link" href="${originalImg}">
    <img
      class="gallery__image"
      src="${previewImg}"
      data-source="${originalImg}"
      alt="${desc}"
    />
  </a>
</div>`;
}

function createGalleryGardsMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) =>
      createGalleryCard(preview, original, description),
    )
    .join('');
}

function insertGalleryCards(galleryMarkup) {
  galleryContainerEl.insertAdjacentHTML('beforeend', galleryMarkup);
}

function onGalleryCardClick(event) {
  event.preventDefault();
  const { target: galleryCard } = event;

  const isGalleryCardEl = galleryCard.classList.contains('gallery__image');

  if (!isGalleryCardEl) {
    return;
  }
  const originalImageURL = galleryCard.dataset.source;
  showOriginalImage(originalImageURL);
}

function showOriginalImage(originalImgURL) {
  modalImage = basicLightbox.create(
    `
    <img src="${originalImgURL}" width="800" height="600">
`,
    {
      onShow: modalImage => {
        document.addEventListener('keydown', hideOriginalImage);
      },
      onclose: modalImage => {
        document.removeEventListener('keydown', hideOriginalImage);
      },
    },
  );
  modalImage.show();
}

function hideOriginalImage(event) {
  const isEscKey = event.code === 'Escape';

  if (isEscKey) {
    modalImage.close();
  }
}
