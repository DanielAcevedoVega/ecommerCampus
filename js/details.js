import { getProducId } from "./module/detail.js";

addEventListener("DOMContentLoaded", async e =>{
    let params = new URLSearchParams(location.search);
    console.log(params.get("id"))
})