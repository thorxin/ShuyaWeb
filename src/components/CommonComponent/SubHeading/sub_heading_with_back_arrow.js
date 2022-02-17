import React from 'react'

//images
import BackArrowIcon from '../../../assets/common/back_arrow.svg'

export const SubHeadingWithBackArrow = (props) => {
  return (
    <>
      <div className="bg-white py-3 md:hidden sticky top-0 w-full z-30 shadow-md">
        <div className="mx-2 md:mx-auto">
          <div className="flex items-center space-x-4">
            <div onClick={props.goTo}>
              <img
                src={BackArrowIcon}
                className="w-3 h-auto"
                alt="BackArrow Icon"
              />
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
