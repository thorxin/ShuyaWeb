import * as endpoints from "../constant/api";

export async function getWishList(data) {
    return await fetch(endpoints.GetWishlist, data)
}

export async function updateWishList(ProductID, IsFav, data) {
  return await fetch(endpoints.UpdateWishlist(ProductID, IsFav), data);
}
