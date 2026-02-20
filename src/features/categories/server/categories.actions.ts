"use server";
import { CategoriesResponse } from"../types/Categort.types"
import axios, { AxiosRequestConfig } from "axios";
 export async function getAllCategories():Promise<CategoriesResponse> {
    try{
     const options: AxiosRequestConfig = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      return data;
    }
    catch(error){
        throw error;
    }
 }