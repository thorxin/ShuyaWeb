import React from "react";
import ReactPlayer from "react-player/lazy";

const ProductClip = ({ Clip = [] }) => {
  if (Clip[0]?.clipPath)
    return (
      <>
        <div className="bg-white  space-y-4 py-4 border-t-2 border-gray-200 mx-4">
          <div className="">
            <p className="primary-font custom-font-bold text-color-secondary">Product Video</p>
          </div>
          <div className="w-full h-72">
            <ReactPlayer
              url={Clip[0].clipPath}
              loop={true}
              controls={true}
              volume={1}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </>
    );

  return null;
};

export default ProductClip;
