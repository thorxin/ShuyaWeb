import React from 'react'
import placeholder from "../../../assets/common/placeholder_icon.svg"
const index = () => {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-4 md:gap-x-3 mx-6 mt-4">
                <div className="my-4">
                    <img
                        src={placeholder}
                        className='w-20 h-20'
                        alt="Cat Img"
                    />
                    <p className="text-center">Light Room</p>
                </div>
            </div>

        </>
    )
}

export default index
