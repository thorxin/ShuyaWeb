import * as endpoints from "../constant/api";

export async function getTag (data) {
    return await fetch(endpoints.GetTag, data);
}

export async function productSearch(api, data) {
    return await fetch(api, data);
}

export async function getProductNameSuggestion(search_text = '', page_number, page_size, data) {
    return await fetch(`${endpoints.GetProductNameSuggestion}${search_text}&PageNumber=${page_number}&PageSize=${page_size}`, data);
}