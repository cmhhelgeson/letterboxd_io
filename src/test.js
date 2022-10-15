import express from "express"
import cors from "cors"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();


const API_KEY = process.env.TMDB_V3_API_KEY;
const url = process.env.TMDB_V3_ROOT_URL

axios.get(`${url}person/popul?page=5&api_key=${API_KEY}`).then((res) => {
    console.log(res.data);
}).catch(err => {
    console.log("Unable to process request");
})

axios.get(`${url}movie/11830?api_key=${API_KEY}`).then((res) => {
    console.log(res);
}).catch(err => {
    console.log("Unable to process request");
})

axios.get(`${url}configuration/languages?api_key=${API_KEY}`).then((res) => {
    console.log(res);
}).catch(err => {
    console.log("Unable to process request");
})