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
            ${new Array(parseInt(data.product_star_rating)).fill(`<img src="../storage/img/star.svg">`).join('')}
            <span>${data.product_star_rating}</span>
            <a href="${data.product_url}">(${data.product_num_ratings} reviews)</a>
        </div>
    </article>`;
}