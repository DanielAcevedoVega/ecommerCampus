export const titleProductDetail = async({data}) =>{
    return /*html*/`
    <article class="article__detail">
        <div class="detail__head">
            <h1>
                ${data.product_title}
            </h1>
            <div class="product__select">
                <img id="btn__minus" src="../storage/img/minus.svg">
                <span id="span__quantity">1</span>
                <img id="btn__plus" src="../storage/img/plus.svg">
            </div>
        </div>
        <div class="detail__score">
            ${data.product_star_rating ? new Array(parseInt(data.product_star_rating)).fill(`<img src="../storage/img/star.svg">`).join('') : 'Producto no calificado'}
            <span>${(data.product_star_rating != null) ? data.product_star_rating: 0}</span>
            <a href="${data.product_url}">(${(data.product_num_ratings != null) ? data.product_num_ratings: 0} reviews)</a>
        </div>
    </article>`;
}

export const infomationProductDetail = async({data}) =>{
    let description = (data.product_description === null || data.product_description.trim() === "") ? "Sin descripcion": data.product_description
    let stringIn = description.slice(0, 165);
    let stringEnd = description.slice(165);
    return /*html*/`
    <details>
            <summary>
                ${(description.length >= 165) ? stringIn+'<strong class="read__more">Read More. . .</strong>': stringIn} 
            </summary>
            <p>${stringEnd}</p>
    </details>`;
}

export const footerProductDetail = async ({data})=>{
    return /*html*/`
    <ul class="footer__ul">
        <li>
            <a href="checkout.html">
                <img src="../storage/img/car.svg">
                <span>Add to Cart | <span id="price_discount">${data.product_price}</span>
                <del><sub><span id="price_original">${(data.product_original_price != null) ? data.product_original_price : ""}</span></sub> </del>
                </span>
            </a>
        </li>
    </ul>`
}