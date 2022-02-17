import React from 'react'

export const TagListFrame = (props) => {
  const toggle = () => {
    if (props.loading && props.data.length <= 0) return true

    return false
  }

  return (
    <>
      <div>
        {toggle() ? (
          <>
            <div className="grid grid-cols-4 gap-x-4 mb-2 gap-y-2">
              <div className="rounded-full w-full h-8 skeleton-loading-animation" />
              <div className="rounded-full w-full h-8 skeleton-loading-animation" />
              <div className="rounded-full w-full h-8 skeleton-loading-animation" />
              <div className="rounded-full w-full h-8 skeleton-loading-animation" />
              <div className="hidden md:block rounded-full w-full h-8 skeleton-loading-animation" />
              <div className="hidden md:block rounded-full w-full h-8 skeleton-loading-animation" />
            </div>
          </>
        ) : (
          props.children
        )}
      </div>
    </>
  )
}
