import React from 'react'
import './products.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import productDetail from './products.json';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/actions';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Products = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const handleAddToCart=(item)=>{

        toast.success("Added To Cart", {
            position:"bottom-right"
          })
          
        dispatch(addToCart(item));
    }
    return (
        <div className="productPage">
            <div className="productTopBanner">
                <div className="productTopBannerItems">
                    Electronics
                </div>
                <div className="productTopBannerItemsSubMenu">Mobiles & Accessories</div>
                <div className="productTopBannerItemsSubMenu">Laptops & Accessories</div>
                <div className="productTopBannerItemsSubMenu">TV & Home Entertainment</div>
                <div className="productTopBannerItemsSubMenu">Audio</div>
                <div className="productTopBannerItemsSubMenu">Cameras</div>
                <div className="productTopBannerItemsSubMenu">Computer Peripherals</div>
                <div className="productTopBannerItemsSubMenu">Smart Technology</div>
                <div className="productTopBannerItemsSubMenu">Musical Instruments</div>
                <div className="productTopBannerItemsSubMenu">Office & Stationary</div>
            </div>

            <div className="productsPageMain">
                <div className="productsPageMainLeftCategory">
                    <div className="productsPageMainLeftCategoryTitle">Category</div>
                    <div className="productsPageMainLeftCategoryContent">
                        <div className="productsPageMainLeftCategoryTitleContent">Computers & Accessories</div>
                        <div className="productsPageMainLeftCategoryContentSub">Macbooks</div>
                        <div className="productsPageMainLeftCategoryContentSub">Grocery</div>
                        <div className="productsPageMainLeftCategoryContentSub">Average Customer Review</div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                        <div className="ratingLeftBox">
                            <StarRateIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />

                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <StarOutlineIcon sx={{ fontSize: "20px", color: "#febd69" }} />
                            <div className="andUp"> & Up</div>
                        </div>

                    </div>
                </div>

                <div className="productsPageMainRight">
                    <div className="productsPageMainRightTopBanner">
                        1-5 of 5 results for <span className='productsPageMainRightTopBannerSpan'>Macbooks</span>
                    </div>

                    <div className="itemsImageProductPage">

                        {
                            productDetail.product.map((item, index) => {
                                return (
                                    <div className='itemsImageProductPageOne' key={item.id}>
                                        <div className='imgBloCkitemsImageProductPageOne'>
                                            <img src={item.imageUrl} className='productImageProduct' />
                                        </div>
                                        <div className='productNameProduc'>
                                            <div>{item.name}</div>
                                            <div className='productNameProductRating'>
                                                <StarRateIcon sx={{ fontSize:"16px", color:"#febd69"}}/>
                                                <StarRateIcon sx={{ fontSize:"16px", color:"#febd69"}}/>
                                                <StarRateIcon sx={{ fontSize:"16px", color:"#febd69"}}/>
                                                <StarRateIcon sx={{ fontSize:"16px", color:"#febd69"}}/>
                                                <StarOutlineIcon sx={{ fontSize:"16px", color:"#febd69"}}/>
                                            </div>
                                            <div className='priceProductDetailPage'>
                                                <div className='currencyText'>₹</div>
                                                <div className='rateHomeDetail'>
                                                    <div className='rateHomeDetailsPrice'>{item.price}</div>
                                                    <div className='addtobasketBtn' onClick={()=>{handleAddToCart(item)}}>Add to Cart</div>
                                                </div>
                                                </div>
                                                <div className='offProductPage'>upto 10% off on select cards</div>
                                                <div className='freeDeliveryHomepage'>free Delivery By Walmart</div>
                                            
                                        </div>
                                    </div>
                                );

                            })
                        }


                    </div>

                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Products