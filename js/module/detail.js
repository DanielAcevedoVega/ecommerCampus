import { headers } from "../components/env.js";



export const getProducId = async({id: idProduct}) =>{
    console.log("Esperando ...................")
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${idProduct}&country=US`;
    const options = {
	    method: 'GET',
	    headers
    };  
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}