import React from 'react';

//image
import PlaceHolderIcon from "../../assets/common/placeholder_icon.svg"

export default function PlaceHolderImage() {
    return (
        <>
            <img src={PlaceHolderIcon} className="w-full h-full object-cover rounded-xl md:rounded-none" alt="PlaceHolderIcon" />
        </>
    )
}
