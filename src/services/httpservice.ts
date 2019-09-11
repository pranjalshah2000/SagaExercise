import axios from 'axios';
import { ProductData } from '../models/productmodel';

// each method of the class will return the promise object
// Ajax call objects of ES6 'fetch', 'XmleHttpRequest'
// external package objects e.g. axios, isomorphic-fetch
const url: string = 'https://apiapptrainingms.azurewebsites.net/api/products'


export const getData = () => {
    let resp = axios.get(url).then(resp => resp.data).then((data: Array<ProductData>) => {
        return data;
    });
    return resp;
}

export const postData = (prd: ProductData) => {
    let resp = axios.post(url, prd, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return resp;
}

export const putData = (id: number, prd: ProductData) => {
    let resp = axios.put(`${url}/${id}`, prd, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return resp;
}
