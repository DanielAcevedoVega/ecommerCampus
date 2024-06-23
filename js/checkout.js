import { galleryCheckout } from "./components/gallery.js";

let mainSectionCheckout = document.querySelector('.checkout__details');
let totalSpan = document.querySelector('.bill__total span');
let subtotalSpan = document.querySelector('.bill__subtotal span');
let shippingFeeSpan = document.querySelector('.bill__fee span');
let totalItemsLabel = document.querySelector('.bill__total label');
let cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : {};
let shippingFee = 0.00;

addEventListener("DOMContentLoaded", async e => {
    mainSectionCheckout.innerHTML = await galleryCheckout(cart);

    document.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', updateQuantity);
    });

    document.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', updateQuantity);
    });
    
    updateTotals();
});

const updateTotals = () =>{
    let subtotal = 0;
    let totalItems = 0;
    for (let id in cart){
        subtotal += cart[id].quantity * parseFloat(cart[id].product.product_price.replace("$", ""));
        totalItems += cart[id].quantity;
    }
    let total = subtotal + shippingFee;
    totalSpan.innerHTML = `$${total.toFixed(2)}`;
    subtotalSpan.innerHTML = `$${subtotal.toFixed(2)}`;
    shippingFeeSpan.innerHTML = `$${shippingFee.toFixed(2)}`;

    totalItemsLabel.innerText = `Total (${totalItems} items)`;
};

const updateQuantity  = (e) =>{
    let btn = e.target;
    let article = btn.closest('.details__product');
    let id = article.getAttribute('data-id');
    let quantitySpan = article.querySelector('.product__select span');
    let quantity = parseFloat(quantitySpan.innerText);

    if(btn.classList.contains('btn-plus')){
        quantity++;
    } else if (btn.classList.contains('btn-minus') && quantity > 1){
        quantity--;
    }

    cart[id].quantity = quantity;
    quantitySpan.innerText = quantity;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateTotals();
};


