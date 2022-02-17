import React from 'react'

export const ProductListFrame = (props) => {
  const toggle = () => {
    if (props.loading && !props.isLoadMore) return true

    return false
  }

  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-5 space-y-4 md:space-y-0 md:gap-x-5 md:gap-y-3">
          {toggle()
            ? arr.map((index) => (
                <div
                  key={index}
                  className="flex w-full h-auto space-x-4 md:grid md:grid-cols-1 md:space-x-0 md:gap-y-2"
                >
                  <div className="w-4/12 md:w-full h-20 skeleton-loading-animation" />
                  <div className=" w-9/12 md:w-full space-y-4">
                    <div className="w-8/12 h-5 skeleton-loading-animation" />
                    <div className="w-full h-8 flex space-x-2 md:grid md:grid-cols-1 md:gap-y-2 md:space-x-0">
                      <div className="w-full md:w-6/12 h-full skeleton-loading-animation" />
                      <div className="w-full md:w-6/12 h-full skeleton-loading-animation" />
                    </div>
                  </div>
                </div>
              ))
            : props.children}
        </div>
      </div>
    </>
  )
}
