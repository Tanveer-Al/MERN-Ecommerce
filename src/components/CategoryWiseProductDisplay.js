import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/getCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadinList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }


  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:gap-6 overflow-x-scroll scrollbar-none transition-all"
      >
        
        {loading
          ? loadinList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-3 grid gap-3">
                    <h2
                      className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black 
                  p-1 py-2 animate-pulse rounded-full bg-slate-200"
                    >
                      {/* this is a faltu comment */}
                    </h2>
                    <p className="capitalize text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                      <p className="text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                    </div>
                    <button className="text-white px-3 rounded-full p-1 py-2 animate-pulse bg-slate-200"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                  onClick={scrollTop}
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product.productImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-3 grid gap-1.5">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full"
                      onClick={(e)=>handleAddToCart(e,product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
