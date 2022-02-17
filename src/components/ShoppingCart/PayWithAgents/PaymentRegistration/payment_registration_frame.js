import React from 'react'

const PaymentRegistrationFrame = (props) => {
  const toggle = () => {
    if (props.loading && !props.data) return true

    return false
  }

  return (
    <>
      <div>
        {toggle() ? (
          <>
            <div className="lg:w-3/5 space-y-5 hidden">
              <div className="w-full h-10 skeleton-loading-animation" />
              <div className="w-32 h-32 md:w-24 md:h-24 bg-gray-300" />
              <div className="w-full h-32 bg-gray-300 animate-pulse" />
              <div className="flex justify-between">
                <div className="w-4/12 h-5 bg-gray-300 animate-pulse" />
                <div className="w-4/12 h-5 bg-gray-300 animate-pulse" />
              </div>
              <div className="w-full h-10 bg-gray-300 animate-pulse" />
            </div>
          </>
        ) : (
          props.children
        )}
      </div>
    </>
  )
}

export default PaymentRegistrationFrame
