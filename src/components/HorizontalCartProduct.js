import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import fetchCategoryWiseProduct from "../helpers/getCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCartProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadinList = new Array(13).fill(null);

  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  // ✅ Memoized fetchData to avoid warning
  const fetchData = useCallback(async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 360;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 360;
  };

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadinList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-3 grid w-full gap-2">
                  <h2 className="bg-slate-200 animate-pulse p-1 rounded-full h-5 w-3/4"> </h2>
                  <p className="bg-slate-200 animate-pulse rounded-full h-4 w-1/2"></p>
                  <div className="flex gap-3 w-full">
                    <p className="bg-slate-200 animate-pulse rounded-full h-4 w-full"></p>
                    <p className="bg-slate-200 animate-pulse rounded-full h-4 w-full"></p>
                  </div>
                  <button className="bg-slate-200 animate-pulse rounded-full h-8 w-full"></button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-3 grid">
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
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
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

export default HorizontalCartProduct;
