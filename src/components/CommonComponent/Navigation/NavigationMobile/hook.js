import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function Hook() {
  const [cartCount, setCartCount] = useState(0);

  const shoppingCart = useSelector(
    (state) => state.shoppingCart.shopCartDetail
  );
  useEffect(() => {
    if (Object.keys(shoppingCart).length === 0) return;
    let count = 0;
    shoppingCart.productInfo.forEach((i) => {
      count += Number(i.qty);
      setCartCount(count);
    });
  }, [shoppingCart]);

  return [cartCount];
}
