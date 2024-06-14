import { getProducId } from "./module/detail.js";
import { galleryCategory } from "./components/gallery.js";

let mainSectionGallery = document.querySelector('#main__section__gallery');

addEventListener("DOMContentLoaded", async e =>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id')
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProducId({id})));
    mainSectionGallery.innerHTML = await galleryCategory(JSON.parse(localStorage.getItem(id)));
    // let {data} = res;
    // let {
    //     category_path,
    //     about_product,
    //     product_details,
    //     product_information,
    //     product_photos,
    //     product_variations,
    //     rating_distribution,
    //     review_aspects,
    //     ...dataUpdate
    // } = data;
    // console.log(dataUpdate);
})