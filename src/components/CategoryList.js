import React, { useEffect, useState } from "react";
import summaryApi from "../common/summaryApi";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    const response = await fetch(summaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between overflow-scroll scrollbar-none">
        {loading 
          ? (categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            }))
          : (categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="p-2"
                  key={product?.category}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer overflow-hidden p-3 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.Category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            }))}
      </div>
    </div>
  );
};

export default CategoryList;
