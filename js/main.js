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
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    navUl.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));
});

inputSearch.addEventListener("change", async e =>{
    let params = new URLSearchParams(location.search);
    let data = {search : e.target.value, id: params.get("id")}
    inputSearch.value = null;

    let res = await getAllProductName(data)
    mainArticle.innerHTML = galleryIndex(res, params.get("id"));
});