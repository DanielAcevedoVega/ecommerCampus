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
    let btnMinus = document.querySelector('#btn__minus');
    let btnPlus = document.querySelector('#btn__plus');
    mainSectionInformation.innerHTML = await infomationProductDetail(info);
    footerDetail.innerHTML = await footerProductDetail(price);

    btnMinus.addEventListener("click", quantity)
    btnPlus.addEventListener("click", quantity)
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

const quantity = async (e)=>{
    let spanQuantity = document.querySelector("#span__quantity");
    let priceDiscount = document.querySelector("#price_discount");
    let priceOriginal = document.querySelector("#price_original");
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    let res = JSON.parse(localStorage.getItem(id)).data;

    let productOriginalPrice = undefined;
    if(res.product_original_price) productOriginalPrice = Number.parseFloat(res.product_original_price.replace("$", ""));
    let productPrice = Number.parseFloat(res.product_price.replace("$", ""));

    if(e.target.id == "btn__plus")spanQuantity.innerHTML = Number.parseFloat(spanQuantity.innerHTML) + 1
    if(e.target.id == "btn__minus" && spanQuantity.innerHTML > "1")spanQuantity.innerHTML = Number.parseFloat(spanQuantity.innerHTML) - 1;

    priceDiscount.innerHTML = `$${(productPrice * Number.parseFloat(spanQuantity.innerHTML)).toFixed(2)}`;
    if(productOriginalPrice) priceOriginal.innerHTML = `$${(productOriginalPrice * Number.parseFloat(spanQuantity.innerHTML)).toFixed(2)}`;
}