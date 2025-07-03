import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const VerticalCart = ({ loading, data = [] }) => {
  const loadingList = Array.from({ length: 13 });
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.stopPropagation(); // Prevent event bubbling
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:justify-center md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product,index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
            >
              <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
              <div className="p-3 grid gap-3">
                <h2 className="font-medium text-base md:text-lg animate-pulse bg-slate-200 rounded-full">
                  {/* comment */}
                </h2>
                <p className="animate-pulse bg-slate-200 rounded-full"></p>
                <div className="flex gap-3">
                  <p className="animate-pulse bg-slate-200 rounded-full w-full"></p>
                  <p className="animate-pulse bg-slate-200 rounded-full w-full"></p>
                </div>
                <button className="animate-pulse bg-slate-200 rounded-full w-full"></button>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              key={product?._id}
              to={`/product/${product?._id}`}
              className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[310px] bg-white rounded-sm shadow"
              onClick={scrollTop}
            >
              <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                <img
                  src={product?.productImage?.[0]}
                  alt={product?.productName || 'Product'}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-3 grid gap-1.5">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
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
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCart;
