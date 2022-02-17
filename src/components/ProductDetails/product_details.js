/** @format */

import React from 'react';

//components
import { Hook } from './hook';
import NavigationWeb from '../CommonComponent/Navigation/NavigationWeb';
import ProductInfo from './ProductInfo';
import QuestionAndAnswer from './QuestionAndAnswer';
import BoughtTogether from './BoughtTogether';
import RelatedProducts from './RelatedProducts';
import FooterWeb from '../CommonComponent/Footer/web_footer';
import Loading from '../CommonComponent/Loading/main_loading';

export default function ProductDetails(props) {
  const [
    isLoading,
    isSecondaryLoading,
    details,
    relatedProductByCategoryList,
    boughtTogetherProductList,
    tagList,
    mainCategory,
    questionAndAnswerList,
    questionCount,
    shopCartCount,
    isFavWish,
    /**
     * action
     */
    clickOnAskQuestion,
    clickingOnProductWishIcon,
    clickingOnWishList,
    goBackTo,
  ] = Hook(props);

  if (Object.keys(details).length === 0 || isLoading) return <Loading />;

  return (
    <>
      <div className='bg-white w-full h-auto min-h-screen md:space-y-5'>
        <NavigationWeb />
        <div className='mx-auto space-y-5'>
          <div className='default-margin-layout md:space-y-2'>
            <ProductInfo
              isSecondaryLoading={isSecondaryLoading}
              Detail={details}
              CartCount={shopCartCount}
              IsFavWish={isFavWish}
              /**
               * action
               */
              clickOnWishList={clickingOnProductWishIcon}
              goBackTo={goBackTo}
            />
          </div>
        </div>
        <div>
          <div className='h-1  bg-gray-100'></div>

          {/* <div className="mx-auto space-y-5">
            <div className="default-margin-layout md:space-y-2">
              <QuestionAndAnswer
              List={questionAndAnswerList}
              QuestionCount={questionCount}
              //action
              clickingOnAskQuestion={clickOnAskQuestion}
            />
            </div>
          </div>

          <div className="h-1  bg-gray-100"></div> */}

          {boughtTogetherProductList.length >= 1 && (
            <>
              <BoughtTogether
                ProductListArray={boughtTogetherProductList}
                TagList={tagList}
                ProductName={details.name}
                clickOnWishList={clickingOnWishList}
              />

              <div className='h-1  bg-gray-100'></div>
            </>
          )}

          {relatedProductByCategoryList.length >= 1 && (
            <RelatedProducts
              ProductListArray={relatedProductByCategoryList}
              Category={mainCategory}
              clickOnWishList={clickingOnWishList}
            />
          )}
          <FooterWeb />
        </div>
      </div>
    </>
  );
}
