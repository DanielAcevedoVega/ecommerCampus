export const titleProductDetail = async({data}) =>{
    return /*html*/`
    <article class="article__detail">
        <div class="detail__head">
            <h1>
                ${data.product_title}
            </h1>
            <div class="product__select">
                <img src="../storage/img/minus.svg">
                <span>1</span>
                <img src="../storage/img/plus.svg">
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
    console.log(data)
    return /*html*/`
    <article class="product__information">
                <p>
                    ${(data.product_description != "") ? data.product_description: "Sin descripcion"} <strong>Read More. . .</strong>
                </p>
            </article>
            <hr>
        </section>
        <section class="main__section">
            <article class="product__custom">
                <div class="product__size">
                    <h5>
                        Choose Size
                    </h5>
                    <div>
                        <img src="../storage/img/s.svg">
                        <img src="../storage/img/m.svg">
                        <img src="../storage/img/l.svg">
                        <img src="../storage/img/xl.svg">
                    </div>
                </div>
                <div class="product__color">
                    <h5>
                        Color
                    </h5>
                    <div>
                        <img src="../storage/img/1.svg">
                        <img src="../storage/img/2.svg">
                        <img src="../storage/img/3.svg">
                    </div>
                </div>
            </article>`;
}

export const footerProductDetail = async ({data})=>{
    return /*html*/`
    <ul class="footer__ul">
        <li>
            <a href="checkout.html">
                <img src="../storage/img/car.svg">
                <span>Add to Cart | ${data.product_price}
                <del><sub>${(data.product_original_price != null) ? data.product_original_price : ""}</sub> </del>
                </span>
            </a>
        </li>
    </ul>`
}