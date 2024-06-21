import { getProductId } from "./module/detail.js";
import { galleryCategory } from "./components/gallery.js";
import { footerProductDetail, infomationProductDetail, titleProductDetail } from "./components/section.js";

let mainSectionGallery = document.querySelector('#main__section__gallery');
let mainSectionTitle = document.querySelector('#main__section__title');
let productoInformation = document.querySelector('.product__information');
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
    productoInformation.innerHTML = await infomationProductDetail(info);
    footerDetail.innerHTML = await footerProductDetail(price);
    let btnAddCart = document.querySelector('#btnAddToCart');
    btnAddCart.addEventListener('click', addToCart)

    btnMinus.addEventListener("click", quantity)
    btnPlus.addEventListener("click", quantity)
})

const addToCart = async (e)=>{
    e.preventDefault();

    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    let product = JSON.parse(localStorage.getItem(id)).data;

    if(product.product_price == null){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Product not available for purchase!",
            showConfirmButton: true,
        });
        return;
    }

    let quantity = parseFloat(document.querySelector('#span__quantity').innerHTML);

    let cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : {};
    if(cart[id]){
        if(cart[id].quantity !== quantity){
            cart[id].quantity = quantity;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product quantity updated in the cart!",
                showConfirmButton: false,
                timer: 2200
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "Product is already in the cart with the same quantity!",
                showConfirmButton: true,
            });
        }
    } else {
        cart[id] = {
            product,
            quantity,
            title: product.product_title,
            image: product.product_photo,
            category: product.category_path[product.category_path.length -1].name
        };

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added to cart!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));

}

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