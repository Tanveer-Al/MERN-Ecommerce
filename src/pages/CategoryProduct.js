import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import summaryApi from "../common/summaryApi";
import VerticalCart from "../components/verticalCart";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = URLSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory
      .map((el, index) => `category=${el}`)
      .join("&&");

    navigate("/product-category?" + urlFormat);
  }, [selectCategory]);

  const handleOneChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    setData((prev) =>
      prev.sort((a, b) =>
        value === "asc"
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-152px)] overflow-y-scroll">
          {/* Sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">SORT BY</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOneChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy === "dsc"}
                  onChange={handleOneChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="checkbox"
                    name={"category"}
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName.value}
                    className=""
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Filter Result : {data.length}</p>
          <div className="overflow-y-scroll max-h-[calc(100vh-200px)]">
            {data.length !== 0 && !loading && <VerticalCart data={data} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
