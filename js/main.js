import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory, getAllProductRandom } from "./module/app.js";
import { menuListCategoryIndex } from "./components/menu.js";
import { getProductId } from "./module/detail.js";
// let headerInformation = document.querySelector(".header__information");
// let [p, span] = headerInformation;
// span.innerHTML = "Daniel";

let inputSearch = document.querySelector("#input__search");
let mainArticle = document.querySelector(".main__article");
let navUl = document.querySelector(".nav__ul");



let searchProducts = async e => {

    let params = new URLSearchParams(location.search);
    let dataSearch = {search : e.target.value, id: params.get("id")}
    inputSearch.value = null;
    let res = "";

    if(inputSearch.dataset.opc == "random"){
        res = await getAllProductRandom({})
        delete inputSearch.dataset.opc
        history.pushState(null, "", "?id=aps");
        console.log(dataSearch)
    } else {
        res = await getAllProductName(dataSearch)
        console.log(dataSearch)
    }
    console.log(res);
    mainArticle.innerHTML = galleryIndex(res, params.get('id'));

    let {data: {products}} = res;
    let asin = products.map(value => {return {id: value.asin}});

    let proceso = new Promise(async(resolve, reject)=>{
        for(let i = 0; i< asin.length; i++){
            if(localStorage.getItem(asin[i].id)) continue;
            let data = await getProductId(asin[i])
            localStorage.setItem(asin[i].id, JSON.stringify(data))
        }
        resolve({message: "Datos bucados correctamente"});
    })
    Promise.all([proceso]).then(res =>{console.log(res);})
};

addEventListener("DOMContentLoaded", async e =>{
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    navUl.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));

    history.pushState(null, "", "?id=fashion");
    inputSearch.value = "pantalon"
    const eventoChange = new Event('change');
    inputSearch.dispatchEvent(eventoChange);
});

inputSearch.addEventListener("change", searchProducts);

