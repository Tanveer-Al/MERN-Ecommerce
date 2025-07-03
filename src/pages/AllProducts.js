import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../common/summaryApi";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    if (!summaryApi?.allProduct?.url) {
      console.error("API URL is missing");
      return;
    }

    try {
      const response = await fetch(summaryApi.allProduct.url);
      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 py-1 px-3 rounded hover:text-white transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      {/* all product */}
      <div className="flex flex-wrap items-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct}/>;
        })}
      </div>
      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
