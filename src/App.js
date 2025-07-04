import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common/summaryApi";
import { useEffect, useState, useCallback } from "react";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // Memoized function to fetch user details
  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  // Memoized function to fetch cart product count
  const fetchUserAddToCart = useCallback(async () => {
    try {
      const response = await fetch(summaryApi.addToCartProductCount.url, {
        method: summaryApi.addToCartProductCount.method,
        credentials: "include",
      });
      const data = await response.json();

      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, []);

  // Call both functions on component mount
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
