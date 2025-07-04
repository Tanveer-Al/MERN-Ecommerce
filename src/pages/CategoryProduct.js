import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import summaryApi from "../common/summaryApi";
import VerticalCart from "../components/verticalCart";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectCategory, setSelectCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const URLSearch = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlCategoryListInArray = URLSearch.getAll("category");

  useEffect(() => {
    const obj = {};
    urlCategoryListInArray.forEach((el) => {
      obj[el] = true;
    });
    setSelectCategory(obj);
  }, [urlCategoryListInArray]);

  // 🚀 FIXED: useCallback with correct dependencies
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(summaryApi.filterProduct.url, {
        method: summaryApi.filterProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: filterCategoryList }),
      });

      const dataResponse = await response.json();
      let fetchedData = dataResponse?.data || [];

      if (sortBy) {
        fetchedData = [...fetchedData].sort((a, b) =>
          sortBy === "asc"
            ? a.sellingPrice - b.sellingPrice
            : b.sellingPrice - a.sellingPrice
        );
      }

      setData(fetchedData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [filterCategoryList, sortBy]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOneChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  // ✅ Update filter list & URL
  useEffect(() => {
    const activeCategories = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );

    setFilterCategoryList(activeCategories);

    const urlFormat = activeCategories.map((el) => `category=${el}`).join("&");
    navigate(`/product-category?${urlFormat}`);
  }, [selectCategory, navigate]);

  // ✅ Fetch data on category or sort change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Sidebar */}
        <div className="bg-white p-2 min-h-[calc(100vh-152px)] overflow-y-scroll">
          {/* Sort */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">SORT BY</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="asc"
                  checked={sortBy === "asc"}
                  onChange={handleOneChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value="dsc"
                  checked={sortBy === "dsc"}
                  onChange={handleOneChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName?.value] || false}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product grid */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Filter Result : {data.length}
          </p>
          <div className="overflow-y-scroll max-h-[calc(100vh-200px)]">
            {loading && <p>Loading...</p>}
            {!loading && data.length === 0 && <p>No products found.</p>}
            {!loading && data.length > 0 && (
              <VerticalCart data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
