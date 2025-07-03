import React, { useEffect, useState } from "react";
import iamge1 from "../assest/banner/img1.webp";
import iamge2 from "../assest/banner/img2.webp";
import iamge3 from "../assest/banner/img3.jpg";
import iamge4 from "../assest/banner/img4.jpg";
import iamge5 from "../assest/banner/img5.webp";

import iamge1Mobile from "../assest/banner/img1_mobile.jpg";
import iamge2Mobile from "../assest/banner/img2_mobile.webp";
import iamge3Mobile from "../assest/banner/img3_mobile.jpg";
import iamge4Mobile from "../assest/banner/img4_mobile.jpg";
import iamge5Mobile from "../assest/banner/img5_mobile.png";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImage = [iamge1, iamge2, iamge3, iamge4, iamge5];
  const mobileImage = [
    iamge1Mobile,
    iamge2Mobile,
    iamge3Mobile,
    iamge4Mobile,
    iamge5Mobile,
  ];
  const nextImage = () => {
    if (desktopImage.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };
  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1);
    }
  }
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(desktopImage.length - 1 > currentImage){
        nextImage()
      }
      else{
        setCurrentImage(0)
      }
    },2000)
    return ()=> clearInterval(interval)
  },[currentImage]);
  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-3xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImage.map((imageURI, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                key={imageURI}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURI} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>
        {/* mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImage.map((imageURI, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                key={imageURI}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURI} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
