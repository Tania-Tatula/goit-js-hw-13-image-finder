import fetchImg from './apiService.js';
import refs from './refs.js';
import debounce from 'lodash.debounce';
import {notification, myError} from './pnotify.js';
import imagesListTpl from '../templates/img-card.hbs'


// onSearch("кролик");
let images = [];
let page = 1;

// function observerHandler(entries) {
//     if(entries[0].isIntersecting){
//         page += 1
//     }
//     return page;
// }

// const observer = new IntersectionObserver(observerHandler);
// observer.observe(refs.listObserverRef);


refs.searchInput.addEventListener('input', receivesTextFromInput);

function receivesTextFromInput(evt) {
  evt.preventDefault();
  const nameSearchImg = evt.currentTarget.value;
  debounsOnInput(nameSearchImg);

  window.addEventListener("scroll", scroll);
  function scroll(){
           
    // let page = 0;
   
    const contentHeight = refs.listScroll.offsetHeight;      // 1) высота блока контента вместе с границами
    const yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
    const window_height = window.innerHeight;      // 3) высота внутренней области окна документа
    const y             = yOffset + window_height;
   
    // если пользователь достиг конца
    if(y >= contentHeight)
    {
        page += 1;
        fetchRefs(nameSearchImg, page);

    }
};

//   return nameSearchImg;
}

function onFetchError(error) {
    myError();
}

const debounsOnInput = debounce(onSearch, 1000);

function onSearch(nameSearchImg) {
 try {
    // const {hits} = await fetchImg(nameSearchImg, page);
    // // images =[...images, ...hits]
    // console.log(fetchImg(nameSearchImg, page));
    // renderImgList(hits);
    fetchRefs(nameSearchImg);
     
 } catch (error) {
    onFetchError(error);
 } finally{
    refs.searchInput.value = '';
 };
   
  }

function renderImgList(hits){
    const renderImgCard = imagesListTpl(hits);
    refs.cardImg.insertAdjacentHTML('beforeend', renderImgCard);
     if(!hits.length){
        onFetchError(error);
}
}

async function fetchRefs(nameSearchImg, page) {
    const {hits} = await fetchImg(nameSearchImg, page);
    // images =[...images, ...hits]
    console.log(fetchImg(nameSearchImg, page));
    renderImgList(hits);
}

// window.addEventListener("scroll", scroll);


// function scroll(){
           
//     // let page = 0;
   
//     const contentHeight = refs.listScroll.offsetHeight;      // 1) высота блока контента вместе с границами
//     const yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
//     const window_height = window.innerHeight;      // 3) высота внутренней области окна документа
//     const y             = yOffset + window_height;
   
//     // если пользователь достиг конца
//     if(y >= contentHeight)
//     {
//         page += 1;
//         onSearch();

//     }
// };


