import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory } from "./module/app.js";
import { menuListCategoryIndex } from "./components/menu.js";
// let headerInformation = document.querySelector(".header__information");
// let [p, span] = headerInformation;
// span.innerHTML = "Daniel";

let inputSearch = document.querySelector("#input__search");
let mainArticle = document.querySelector(".main__article");
let navUl = document.querySelector(".nav__ul");

addEventListener("DOMContentLoaded", async e =>{
    let data = await getAllCategory();
    navUl.innerHTML = await menuListCategoryIndex(data);
});

inputSearch.addEventListener("change", async e =>{
    let data = {search : e.target.value}
    inputSearch.value = null;

    let res = await getAllProductName(data)
    mainArticle.innerHTML = galleryIndex(res);
});