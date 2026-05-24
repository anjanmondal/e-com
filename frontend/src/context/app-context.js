// importing context from React for managaing global state
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import { dummyproducts } from "../assets/assets";
import axios from "axios";

// connecting with backend
axios.defaults.withCredentials = true ;
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || "https://e-com-evne.onrender.com";

// This context will be used to manage the global state of the application
export const AppContext = createContext();

// This provider component will wrap the application and provide the context to all components
export const AppContextProvider = ({children})=>{

    // Importing the currency from environment variables (.env file)
    const currency = process.env.REACT_APP_CURRENCY || "$" ;


    // This state will hold the user information, initially set to null
    const [user, setUser] = useState(null);
    // This state will hold the token for authentication, initially set to null
    const [isSeller, setIsSeller] = useState(false);

    // This state will hold the products, initially set to an empty array
    const [products, setProducts] = useState([]);

    // This state for managing the cart items, initially set to an empty object
    const [cartItems, setCartItems] = useState({});

    // This state for managing the products, initially set to an empty object
    const [SearchQuery, setSearchQuery] = useState({});

    // This function fetches the products and sets them in the products state
    const fetchProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // fetch admin status
    const fetchAdmin = async ()=>{
        try {
            const {data} = await axios.get('/api/admin/is-auth');
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch user status and user cartitems
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
        }
    }
    
    // fetching data
    useEffect(()=>{
        fetchAdmin();
        fetchUser();
        fetchProducts();
    }, []);

    // saving cartitems to database
    useEffect(()=>{
        const updateCart = async ()=>{
            if (!user) return; // Only update cart if user is authenticated
            try {
                const {data} = await axios.post('/api/cart/update', {cartItems});
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        updateCart();
    }, [cartItems, user]);

    // get cart item count
    const getCartCount = ()=>{
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // get cart total amount
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product)=> product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100)/100;
    }

    // add product to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]){
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart');
    }

    // update cart item quantity
    const updateCartItem = (itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart updated');
    }

    // remove item from cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]){
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Removed from cart');
        setCartItems(cartData);
    }

    // The context value will be provided to all components that consume this context
    // It includes all the functionality and state defined above
    const Value = {user, setUser, isSeller, setIsSeller, products, currency, cartItems, setCartItems, addToCart, updateCartItem, removeFromCart, SearchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, fetchUser}

    return <AppContext.Provider value={Value}>
             {children}
           </AppContext.Provider>
}

// This custom hook will be used to access the context in any component
export const useAppContext = ()=>{
    return useContext(AppContext);
}

