import { galleryItems } from './gallery-items.js';

const galleryContainerEl = document.querySelector('.gallery');

insertGalleryCards(createGalleryGardsMarkup(galleryItems));

const modalImage = new SimpleLightbox('.gallery .gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
});

function createGalleryCard(previewImg, originalImg, desc) {
  return `
  <a class="gallery__item" href="${originalImg}">
  <img class="gallery__image" src="${previewImg}" alt="${desc}" />
</a>`;
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
