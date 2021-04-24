import fetchImg from './apiService.js';
import refs from './refs.js';
import debounce from 'lodash.debounce';
import {notification, myError} from './pnotify.js';
import imagesListTpl from '../templates/img-card.hbs'


// onSearch("кролик");



refs.searchInput.addEventListener('input', receivesTextFromInput);

function receivesTextFromInput(evt) {
  evt.preventDefault();
  const searchImg = evt.currentTarget.value;
  debounsOnInput(searchImg);
}

function onFetchError(error) {
    myError();
//   refs.cardImg.innerHTML = '',
//   console.log(error);
//     myError();
}

const debounsOnInput = debounce(onSearch, 1000);

async function onSearch(searchImg) {
 try {
    const {hits} = await fetchImg(searchImg);
    const renderImgCard = imagesListTpl(hits);
    refs.cardImg.innerHTML = renderImgCard;
     if(!hits.length){
        onFetchError(error);
     }
     
 } catch (error) {
    onFetchError(error);
 } finally{
    refs.searchInput.value = '';
 };


   
  }

