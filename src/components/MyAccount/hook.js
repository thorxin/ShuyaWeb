/** @format */

import { useEffect,useState } from 'react';

//components
import { GET_STORED_USER_ID } from '../../util/storage';

export function Hook({
  userAccountInfo,
  deliveryAddress,
  WishListProduct,
  /**
   * action
   */
  fetchUserAccountInfo,
  fetchDeliveryAddress,
  updateSelectedDeliveryAddress,
  fetchWishList
}) {

  const [wishListCount, setwishListCount] = useState(0)
  useEffect(() => {
    fetchUserAccountInfo(GET_STORED_USER_ID);
    fetchDeliveryAddress();
    fetchWishList();
  }, [GET_STORED_USER_ID]);
  
  useEffect(()=>{
    setwishListCount(WishListProduct.length)
  },[WishListProduct])

  useEffect(async () => {
    if (deliveryAddress.length == 1) {
      if (deliveryAddress[0]?.selected == false) {
        if (deliveryAddress[0]?.id > 0) {
          await updateSelectedDeliveryAddress({
            productCarts: [],
            deliveryAddressId: parseInt(deliveryAddress[0]?.id),
          });
        }
      }
    }
  }, [deliveryAddress]);

  return [userAccountInfo, deliveryAddress,wishListCount];
}
