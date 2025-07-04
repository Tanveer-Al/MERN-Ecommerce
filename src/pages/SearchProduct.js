import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import VerticalCart from "../components/verticalCart";

const SearchProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(summaryApi.searchProduct.url + location.search);
        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setData([]); // fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    if (location.search) {
      fetchProduct();
    }
  }, [location.search]); // ✅ only re-runs when search query changes

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}

      {!loading && (
        <>
          <p className="text-lg font-semibold my-4">
            Search Result: {data.length}
          </p>

          {data.length === 0 ? (
            <p className="bg-white text-lg text-center p-4">
              No Data Found...
            </p>
          ) : (
            <VerticalCart loading={loading} data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchProduct;
