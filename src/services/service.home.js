import * as endpoints from "../constant/api";

export async function getMainCategory(data) {
    return await fetch(endpoints.GetMainCategory, data)
}

export async function getLandingProductPromotion(data) {
    return await fetch(endpoints.GetLandingProductPromotion, data)
}

export async function getLandingProductLatest(data) {
    return await fetch(endpoints.GetLandingProductLatest, data)
}

export async function getBestSellingProduct(data) {
    return await fetch(endpoints.GetBestSellingProduct, data)
}

export async function getProductListBuyer(data) {
    return await fetch(endpoints.GetAllProductListBuyer, data)
}

export async function getBannerList(type = 0, data) {
    return await fetch(`${endpoints.GetBannerList}${type}`, data)
}

export async function getCartDetail(data) {
    return await fetch(endpoints.GetCartDetail, data);
}

export async function getBuyOneGetOneList(data) {
    return await fetch(endpoints.GetLandingProductPromotionBuyOneGetOne, data)
}

export async function getPopupBanner() {
    return await fetch(endpoints.GetPopupBanner);
}

export async function getBrand(data) {
    return await fetch(endpoints.GetBrand,data);
}