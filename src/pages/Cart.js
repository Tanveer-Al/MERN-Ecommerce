import React, { useContext, useEffect, useState, useCallback } from "react";
import summaryApi from "../common/summaryApi";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  // ✅ Memoized fetchData
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.addToCartProductView.url, {
        method: summaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const increseQty = async (id, qty) => {
    const response = await fetch(summaryApi.updateCartProduct.url, {
      method: summaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const decreseQty = async (id, qty) => {
    if (qty > 1) {
      const response = await fetch(summaryApi.updateCartProduct.url, {
        method: summaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(summaryApi.deleteCartProduct.url, {
      method: summaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index + "Add To Cart"}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-200 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id + "Add To Cart"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200 p-2">
                    <img
                      src={product?.productId.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          decreseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                        aria-label="Increase quantity"
                        onClick={() =>
                          increseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white mt-3">
              <div className="text-white bg-red-600 px-4 py-1 flex items-center justify-center">
                Summary
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button className="bg-blue-600 p-3 text-white w-full mt-2">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
