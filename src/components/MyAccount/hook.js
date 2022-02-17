/** @format */

import { useEffect } from 'react'

//components
import { GET_STORED_USER_ID } from '../../util/storage'

export function Hook({
  userAccountInfo,
  deliveryAddress,
  /**
   * action
   */
  fetchUserAccountInfo,
  fetchDeliveryAddress,
  updateSelectedDeliveryAddress,
  fetchWishList,
}) {
  useEffect(() => {
    fetchUserAccountInfo(GET_STORED_USER_ID)
    fetchDeliveryAddress()
    fetchWishList()
  }, [GET_STORED_USER_ID])

  useEffect(async () => {
    if (deliveryAddress.length == 1) {
      if (deliveryAddress[0]?.selected == false) {
        console.log(deliveryAddress)
        if (deliveryAddress[0]?.id > 0) {
          await updateSelectedDeliveryAddress({
            productCarts: [],
            deliveryAddressId: parseInt(deliveryAddress[0]?.id),
          })
        }
      }
    }
  }, [deliveryAddress])

  return [userAccountInfo, deliveryAddress]
}
