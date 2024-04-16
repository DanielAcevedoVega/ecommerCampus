export const menuListCategoryIndex = (res)=>{
    let {data} = res;
    let plantilla = "";
    data.forEach((value, index) =>{
        plantilla += /*html*/`
        <li title="${value.name}">
            <a href="?id=${value.id}" data-id="${value.id}" class="category-link">
                <img src="storage/img/category.svg">
                <span>${value.name}</span>
            </a>
        </li>`;
    });
    return plantilla;
}