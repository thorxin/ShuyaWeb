import * as endpoints from "../constant/api";
import httpService from '../constant/httpService';

export async function getLandingMainCategory() {
  return await httpService.get(`/api/Miscellaneous/GetMainCategoryForHomePage`);
}

export async function searchProductByCategory(categoryId = 0, data) {
    return await fetch(`${endpoints.ProductSearchByCategory}${categoryId}`, data)
}

export async function getSubCategory(mainId, data) {
  return await fetch(`${endpoints.GetMainCategoryById}${mainId}`, data);
  // return await fetch(`${endpoints.GetSubCategory}${mainId}`, data)
}

export async function getLandingCategoryDetail() {
  return await httpService.get(`/api/Miscellaneous/GetMainCategoryForDetail`);
}

export async function getProductByBrand(id, page, data) {
  return await fetch(`${endpoints.GetProductByBrand}${id}&PageNumber=${page}&PageSize=10`, data);
}