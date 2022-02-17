import React from 'react'

export const PopOverBox = (props) => {
  return (
    <>
      <div className="absolute bg-white w-full h-auto max-h-60 z-10 mt-1 py-4 shadow-lg overflow-y-auto custom-scroll">
        <div className="default-margin-layout">{props.children}</div>
      </div>
    </>
  )
}
