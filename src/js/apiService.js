import {notification, myError} from './pnotify.js';
import refs from './refs.js';


const API_KEY = '21253837-b1ce1cf3df57506fc2e4b8a71';
// let page = 1;
// `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${кролик}&page=${page}&per_page=12&key=${API_KEY}`;

export default fetchImg;
    async function fetchImg(wordToSearch, page) {
               const rawResult = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${wordToSearch}&page=${page}&per_page=12&key=${API_KEY}`);

               if(!rawResult.ok){
            throw rawResult;
        }
        
       const result = await rawResult.json();
    //    console.log(result.total);
        return result;
}


