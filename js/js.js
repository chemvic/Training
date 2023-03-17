// Import dependencies
import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesFetchService from '../src/fetchService';
import 'intersection-observer';

// Define constants
const formEl = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

// Initialize objects
const imagesFetchService = new ImagesFetchService();
const io = new IntersectionObserver(onIntersection, { threshold: 1 });

// Add event listeners
formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

// Function definitions
function onSubmit(event) {
  event.preventDefault();
  resetGallery();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (searchQuery === '') {
    return;
  }
  imagesFetchService.imagesForSearch = searchQuery;
  imagesFetchService.fetchImages().then(renderImages);
  formEl.reset();
}

function onIntersection([entry], observer) {
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    if (imagesFetchService.fetchedCards !== imagesFetchService.availableCards) {
      onLoadMore();
    }
  }
}

function onLoadMore() {
  imagesFetchService.fetchImages().then(renderImages);
}

function renderImages(images) {
  const hits = images.data.hits;
  if (hits.length === 0 && imagesFetchService.fetchedCards === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  }
  if (imagesFetchService.availableCards && imagesFetchService.currentPage === 1) {
    Notify.success(`Hooray! We found ${imagesFetchService.availableCards} images.`);
  }
  hits.forEach(hit => {
    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__item');
    imgEl.src = hit.webformatURL;
    imgEl.alt = hit.tags;
    galleryEl.appendChild(imgEl);
  });
  imagesFetchService.fetchedCards += hits.length;
  if (imagesFetchService.fetchedCards === imagesFetchService.availableCards) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    hideLoadMoreBtn();
  } else {
    observeLastImgEl();
    showLoadMoreBtn();
  }
  initSimpleLightbox();
}

function observeLastImgEl() {
  const lastImgEl = galleryEl.lastElementChild;
  if (lastImgEl) {
    io.observe(lastImgEl);
  }
}

function initSimpleLightbox() {
  const imgEls = document.querySelectorAll('.gallery__item');
  if (imgEls.length > 0) {
    const lightbox = new SimpleLightbox('.gallery__item');
    lightbox.refresh();
  }
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

function resetGallery() {
  galleryEl.innerHTML = '';
  imagesFetchService.currentPage = 0;
  imagesFetchService.fetchedCards = 0;
  imagesFetchService.availableCards = 0;
  hideLoadMoreBtn();
}
