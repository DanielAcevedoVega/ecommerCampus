import { getProductId } from "./module/detail.js";
import { galleryCategory } from "./components/gallery.js";
import { footerProductDetail, infomationProductDetail, titleProductDetail } from "./components/section.js";

let mainSectionGallery = document.querySelector('#main__section__gallery');
let mainSectionTitle = document.querySelector('#main__section__title');
let mainSectionInformation = document.querySelector('#main__section__information');
let footerDetail = document.querySelector('#footer__detail');

addEventListener("DOMContentLoaded", async e =>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id')
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));

    let title = JSON.parse(localStorage.getItem(id));
    let info = JSON.parse(localStorage.getItem(id));
    let price = JSON.parse(localStorage.getItem(id));

    mainSectionGallery.innerHTML = await galleryCategory(JSON.parse(localStorage.getItem(id)));
    mainSectionTitle.innerHTML = await titleProductDetail(title);
    mainSectionInformation.innerHTML = await infomationProductDetail(info);
    footerDetail.innerHTML = await footerProductDetail(price);
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