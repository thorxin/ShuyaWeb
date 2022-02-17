import React from 'react'

export const PaymentAccountFrame = (props) => {
  const toggle = () => {
    if (props.loading && !props.data) return true

    return false
  }

  return (
    <>
      <div className="flex space-x-5 items-center">
        {toggle() ? (
          <>
            <div className="w-28 h-14 skeleton-loading-animation" />
            <div className="space-y-2">
              <div className="w-28 h-4 skeleton-loading-animation" />
              <div className="w-36 h-4 skeleton-loading-animation" />
            </div>
          </>
        ) : (
          props.children
        )}
      </div>
    </>
  )
}
