import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common/summaryApi";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose,fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(summaryApi.uploadProduct.url, {
      method: summaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose()
      fetchData()
    }
    if (responseData.error) {
      toast.error(responseData?.message)
    }
  };
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="rounded bg-white p-4 w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-lg">Upload Photo</h1>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          action=""
          className="grid p-4 gap-2 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded h-10"
            required
          />
          <label htmlFor="brandName" className="mt-2">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded h-10"
            required
          />
          <label htmlFor="category" className="mt-2">
            Category :
          </label>
          <select
            value={data.category}
            name="category"
            className="p-2 bg-slate-100 border rounded h-11"
            required
            onChange={handleOnChange}
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-2">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="border p-2 bg-slate-100 rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-1">
                <span className="text-3xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Plese Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>

          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            name="price"
            value={data.price}
            required
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded h-10"
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>

          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Selling Price"
            name="sellingPrice"
            required
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded h-10"
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            name="description"
            id=""
            required
            className="h-28 bg-slate-100 border resize-none p-2"
            placeholder="Enter Product Description"
            onChange={handleOnChange}
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
