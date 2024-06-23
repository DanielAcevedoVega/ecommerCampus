export const galleryIndex = (res, category)=>{
    let {products} = res.data
    let plantilla = "";
    products.forEach((value, index)=>{
        plantilla += /*html*/`            
        <section>
        <div class="section__front_page">
            <a href="views/detail.html?id=${value.asin}">
                <img src="${value.product_photo}">
            </a>
                <img src="storage/img/heart.svg">
        </div>
        <h5>${value.product_title}</h5>
        <small>${category}</small>
        <div class="section__price">
            <span>${(value.product_price != null) ? value.product_price: ""}</span>
            <div class="price__score">
                <img src="storage/img/star.svg">
                <p>${(value.product_star_rating!= null) ? value.product_star_rating : 0}</p>
            </div>
        </div>
    </section>`;
    }) 
    return plantilla;
}

export const galleryCategory = ({data: {product_photos}})=>{
    return /*html*/`
        <article class="section__product">
            <div class="product__image">
                ${product_photos.map(value => `<div class="product__image__item"><img src="${value}"></div>`).join('')}
            </div>
            <div class="product__menu">
                <a href="javascript:window.history.back()">
                    <img src="../storage/img/back.svg">
                </a>
                <img src="../storage/img/heartBlack.svg">
            </div>
        </article>`;
}

export const galleryCheckout = (cart) => {
    let plantilla = "";
    for (let id in cart) {
        let value = cart[id];
        plantilla += /*html*/`
            <article class="details__product" data-id="${id}">
                <div class="product__imagen">
                    <img src="${value.image}">
                </div>
                <div class="product__description">
                    <h3>${value.title}</h3>
                    <small>${value.category}</small>
                    <span>${value.product.product_price}</span>
                </div>
                <div class="product__custom">
                    <img src="../storage/img/option.svg">
                    <div class="product__select">
                        <img src="../storage/img/minusCheckout.svg" class="btn-minus">
                        <span>${value.quantity}</span>
                        <img src="../storage/img/plusCheckout.svg" class="btn-plus">
                    </div>
                </div>
            </article>`;
    }
    return plantilla;
};

