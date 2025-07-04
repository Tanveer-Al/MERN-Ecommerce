import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinate, setZoomImageCordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const productImageListLoading = new Array(4).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();

  // ✅ FIX: useCallback + dependency
  const fetchProductDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.productDetails.url, {
        method: summaryApi.productDetails.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: params?.id }),
      });

      if (!response.ok) throw new Error("Failed to fetch product details");

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage?.[0] || "");
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  }, [params?.id]);

  // ✅ useEffect with correct dependency
  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);
  const handleMouseEnterProduct = (imageURL) => setActiveImage(imageURL);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image Section */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt="Product"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] bg-slate-200 mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL) => (
                  <div
                    key={imgURL}
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                  >
                    <img
                      src={imgURL}
                      alt="Thumbnail"
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-7 lg:h-8 w-full rounded-full"></p>
            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse w-full h-8"> </h2>
            <p className="capitalize text-slate-400 bg-slate-200 animate-pulse w-full h-6"></p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
              {data.brandName}
            </p>
            <h2 className="text-2xl lg:text-3xl font-medium">{data.productName}</h2>
            <p className="capitalize text-slate-400">{data.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">{displayINRCurrency(data.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy Now
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <p className="text-slate-600 font-medium my-1">Description:</p>
            <p>{data.description}</p>
          </div>
        )}
      </div>

      {data?.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading="Recommended Product"
        />
      )}
    </div>
  );
};

export default ProductDetails;
