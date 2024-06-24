import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory, getAllProductRandom } from "./module/app.js";
import { menuListCategoryIndex } from "./components/menu.js";
import { getProductId } from "./module/detail.js";

let inputSearch = document.querySelector("#input__search");
let mainArticle = document.querySelector(".main__article");
let navUl = document.querySelector(".nav__ul");
let loadPage = document.querySelector('#loader-page');
let cartCount = document.querySelector('#cart__count');
let linkValidate = document.querySelector('#link__validate');

const updateCartCount = () =>{
    let cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : {};
    let count = Object.keys(cart).reduce((acc, id) => acc + cart[id].quantity, 0);
    cartCount.innerHTML = count;
};

const loadProducts = async (dataSearch, isRandom = false) => {
    let res = "";

    loadPage.style.display = 'flex'; 

    if (isRandom) {
        res = await getAllProductRandom({});
        sessionStorage.setItem("products", JSON.stringify(res));
        sessionStorage.setItem("isRandom", true);
    } else {
        res = await getAllProductName(dataSearch);
        sessionStorage.setItem("products", JSON.stringify(res));
        sessionStorage.setItem("isRandom", false);
    }

    loadPage.style.display = 'none'; 

    if (res.data && res.data.products) {
        mainArticle.innerHTML = galleryIndex(res, dataSearch.id);

        let { data: { products } } = res;
        products.forEach(async (product) => {
            if (!localStorage.getItem(product.asin)) {
                let data = await getProductId({ id: product.asin });
                localStorage.setItem(product.asin, JSON.stringify(data));
            }
        });
    } 
};

let searchProducts = async (e) => {
    e.preventDefault();
    let params = new URLSearchParams(location.search);
    let dataSearch = { search: inputSearch.value, id: params.get("id") };
    inputSearch.value = null;
    
    await loadProducts(dataSearch, false);
};

let handleCategoryClick = async (e) => {
    e.preventDefault();
    document.querySelectorAll('.category-link').forEach(link => {
        link.classList.remove('active');
    });
    let categoryLink = e.target.closest('a');
    categoryLink.classList.add('active');
    let categoryID = e.target.closest('a').dataset.id;
    let currentCategory = new URLSearchParams(location.search).get("id");

    if (categoryID !== currentCategory) {
        history.pushState(null, "", `?id=${categoryID}`);
        await loadProducts({ search: "", id: categoryID }, false);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    if (!localStorage.getItem("getAllCategory")) {
        let categories = await getAllCategory();
        localStorage.setItem("getAllCategory", JSON.stringify(categories));
    }

    navUl.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));

    let storedProducts = sessionStorage.getItem("products");
    let isRandom = sessionStorage.getItem("isRandom") === "true";

    if (storedProducts) {
        let products = JSON.parse(storedProducts);
        let category = isRandom ? "fashion" : new URLSearchParams(location.search).get("id");
        mainArticle.innerHTML = galleryIndex(products, category);
    } else {
        history.pushState(null, "", "?id=aps");
        inputSearch.value = "";
        await loadProducts({ search: "", id: "fashion" }, true);
    }

    let currentCategoryID = new URLSearchParams(location.search).get("id");
    document.querySelectorAll('.category-link').forEach(link => {
        if (link.dataset.id === currentCategoryID) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', handleCategoryClick);
    });

    updateCartCount();

    linkValidate.addEventListener("click", (e)=>{
        let cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : {};
        if (Object.keys(cart).length === 0) {
            e.preventDefault();
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Your cart is empty!",
                showConfirmButton: true,
            });
        }
    });
});

inputSearch.addEventListener("change", searchProducts);





