import React, { useState, useEffect } from 'react';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Component/firebase';

const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Local state for auth
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        setCartItem(cartItems);
    }, [cartItems]);

    // ✅ Listen for login state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // true if user exists
        });
        return () => unsubscribe();
    }, []);

    const handleRemoveFromCart = (id) => {
        toast.error("Item Removed From Cart", {
            position: "bottom-right"
        });
        dispatch(removeFromCart(id));
    };

    const handleProceedToBuy = () => {
        if (!isLoggedIn) {
            toast.info("Please login to proceed", { position: "bottom-right" });
            setTimeout(() => {
                navigate('/LoginPage');
            }, 2000);
        } else {
            toast.info("This part is under development", { position: "bottom-right" });
            setTimeout(() => {
                navigate('');
            }, 2000);
        }
    };

    const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="cart">
            <div className="topLeftCart">
                <div className="topLeftCartTitle">Shopping Cart</div>
                <div className="desellectAllCart">Deselect all items</div>
                <div className="cartPriceTextDivider">Price</div>

                <div className="cartItemsDiv">
                    {
                        cartItems.map((item) => (
                            <div className="cartItemBlock" key={item.id}>
                                <div className="cartItemLeftBlock">
                                    <div className="CartItemLeftBloackImage">
                                        <img className='cartItemLeftBlockImg' src={item.imageUrl} alt="Product" />
                                    </div>
                                    <div className='cartItemLeftBlockDetails'>
                                        <div className='cartItemProductName'>{item.name}</div>
                                        <div className='inStockCart'>In Stock</div>
                                        <div className='elgFreeShip'>Eligible for FREE Shipping</div>
                                        <div className='amazonFullFilledImage'>
                                            <img className='fullfillimg' alt="" />
                                        </div>
                                        <div className='removeFromCart' onClick={() => handleRemoveFromCart(item.id)}>
                                            Remove From Basket
                                        </div>
                                    </div>
                                </div>
                                <div className="cartItemRightBlock">
                                    Rs {item.price}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="topRightCart">
                <div className="subTotalTitle">
                    Subtotal ({cartItem.length} items) : 
                    <span className='subTotalTitleSpan'> Rs {totalCost}</span>
                </div>
                <div className="giftAddto">
                    <input type='checkbox' />
                    <div>This Order Contains a gift</div>
                </div>
                <div className="proceedToBuy" onClick={handleProceedToBuy}>
                    Proceed To Buy
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Cart;
