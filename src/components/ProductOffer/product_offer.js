import React from 'react'
import { useHistory } from 'react-router';

//components
import Cart from "./product_card"
import { Hook }from "./hook"

const Index = (props) => {
  const [
    isLoading,
    productOfferList
  ] = Hook(props)

    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
        
    return (
        <>
        <Cart
          isLoading={isLoading}
          Information={productOfferList}
          goBack={goBack} />
        </>                 
    )
}

export default Index
