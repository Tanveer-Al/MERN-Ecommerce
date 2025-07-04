import React, { useContext, useEffect, useState, useCallback } from "react";
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

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  // ✅ Memoize fetchData
  const fetchData = useCallback(async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ No more warning

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadinList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-3 grid gap-3">
                  <div className="h-5 bg-slate-200 rounded-full animate-pulse w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse w-1/2"></div>
                  <div className="flex gap-3">
                    <div className="h-4 bg-slate-200 rounded-full animate-pulse w-full"></div>
                    <div className="h-4 bg-slate-200 rounded-full animate-pulse w-full"></div>
                  </div>
                  <div className="h-8 bg-slate-200 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-3 grid gap-1.5">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
