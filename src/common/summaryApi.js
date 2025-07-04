const backenDomain = "https://mern-ecommerce-backend-xne7.onrender.com/"

const summaryApi = {
    signUp : {
        url : `${backenDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backenDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backenDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backenDomain}/api/userLogout`,
        method : "get"
    },
    AllUsers : {
        url : `${backenDomain}/api/all_users`,
        method : "get"
    },
    updateUser : {
        url : `${backenDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backenDomain}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backenDomain}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backenDomain}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backenDomain}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backenDomain}/api/category-product`,
        method : "post"
    },
    productDetails : {
        url : `${backenDomain}/api/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${backenDomain}/api/addtocart`,
        method : "post"
    },
    addToCartProductCount : {
        url : `${backenDomain}/api/countAddToCartProduct`,
        method : "get"
    },
    addToCartProductView : {
        url : `${backenDomain}/api/view-cart-product`,
        method : "get"
    },
    updateCartProduct : {
        url : `${backenDomain}/api/update-cart-product`,
        method : "post"
    },
    deleteCartProduct : {
        url : `${backenDomain}/api/delete-cart-product`,
        method : "post"
    },
    searchProduct : {
        url : `${backenDomain}/api/search`,
        method : "get"
    },
    filterProduct : {
        url : `${backenDomain}/api/filter-product`,
        method : "post"
    },
}

export default summaryApi