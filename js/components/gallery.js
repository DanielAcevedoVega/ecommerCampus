

export const galleryIndex = (res)=>{
    let {products} = res.data
    let plantilla = "";
    products.forEach((value, index)=>{
        plantilla += /*html*/`            
        <section>
        <div class="section__front_page">
            <a href="views/detail.html">
                <img src="${value.product_photo}">
            </a>
            <button>
                <img src="storage/img/heart.svg">
            </button>

        </div>
        <h5>${value.product_title}</h5>
        <small>${value.sales_volume}</small>
        <div class="section__price">
            <span>${value.product_price}</span>
            <div class="price__score">
                <img src="storage/img/star.svg">
                <p>${value.product_star_rating}</p>
            </div>
        </div>
    </section>`;
    }) 
    return plantilla;
}