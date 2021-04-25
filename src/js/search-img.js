import NewsfetchImg from './apiService.js';
import refs from './refs.js';
import debounce from 'lodash.debounce';
import {notification, myError} from './pnotify.js';
import imagesListTpl from '../templates/img-card.hbs'

const newsfetchImg = new NewsfetchImg();


// function observerHandler(entries) {
    
//     if(entries[0].isIntersecting){
//         page += 1
       
//         fetchRefs(receivesTextFromInput, page);
//     }
//     fetchRefs(receivesTextFromInput, page);
// }

// const observer = new IntersectionObserver(observerHandler);
// observer.observe(refs.listObserverRef);



const receivesTextFromInput = (evt) => {
  evt.preventDefault();
  clearImgPage()
  newsfetchImg.resetPage();
  newsfetchImg.query = evt.currentTarget.value;
  debounsOnInput();    

};

refs.searchInput.addEventListener('input', receivesTextFromInput);
refs.listObserverRef.addEventListener('click', onSearch)


const debounsOnInput = debounce(onSearch, 1000);

function onSearch() {
 try {
    fetchRefs();
     
 } catch (error) {
    myError();
 } finally{
    refs.searchInput.value = '';
 };
   
  }

function renderImgList(hits){
    const renderImgCard = imagesListTpl(hits);
    refs.cardImg.insertAdjacentHTML('beforeend', renderImgCard);
     if(!hits.length){
        myError();
}
}

async function fetchRefs() {
    const {hits} = await newsfetchImg.fetchImg();
    renderImgList(hits);


};


function clearImgPage() {
    refs.cardImg.innerHTML ='';
}