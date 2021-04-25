const API_KEY = '21253837-b1ce1cf3df57506fc2e4b8a71';
const BASE_URL = 'https://pixabay.com';

export default class NewsfetchImg {
    constructor(){
        const nameSearchImg ='';
        this.page = 1;
     }

   
        async fetchImg (){
            const rawResult = await fetch(`${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.nameSearchImg}&page=${this.page}&per_page=12&key=${API_KEY}`);
            if(!rawResult.ok){
         throw rawResult;
     }
     
    const result = await rawResult.json();
    this.page += 1;
     return result;
}
resetPage(){
    this.page = 1;
}

get query(){
    return this.nameSearchImg;
}

set query(newQuery){
    this.nameSearchImg = newQuery;
}
    }

