import NewsfetchImg from './apiService.js';
import refs from './refs.js';
import debounce from 'lodash.debounce';
import myError from './pnotify.js';
import imagesListTpl from '../templates/img-card.hbs';
import LoadMoreBtn from './btn.js';
// import ToScroll from './scroll.js';

const newsfetchImg = new NewsfetchImg();
// const toScroll = new ToScroll();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const receivesTextFromInput = evt => {
  evt.preventDefault();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  clearImgPage();
  newsfetchImg.resetPage();
  newsfetchImg.query = evt.currentTarget.value;
  debounsOnInput();
};

refs.searchInput.addEventListener('input', receivesTextFromInput);
loadMoreBtn.refs.button.addEventListener('click', onSearch);

const debounsOnInput = debounce(onSearch, 1000);

function onSearch() {
  loadMoreBtn.disable();
  try {
    fetchRefs();
  } catch (error) {
    myError();
  } finally {
    refs.searchInput.value = '';
  }
}

function renderImgList(hits) {
  const renderImgCard = imagesListTpl(hits);
  refs.cardImg.insertAdjacentHTML('beforeend', renderImgCard);
  onScroll();
  if (!hits.length) {
    loadMoreBtn.hide();
    myError();
  }
}

async function fetchRefs() {
  const { hits } = await newsfetchImg.fetchImg();
  renderImgList(hits);
  loadMoreBtn.enable();
}

function clearImgPage() {
  refs.cardImg.innerHTML = '';
}

function onScroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 100000,
      behavior: 'smooth',
    });
  }, 500);
}
