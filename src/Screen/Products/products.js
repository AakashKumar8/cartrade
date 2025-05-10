import React, { useState } from 'react';
import './products.css';
import { useParams } from 'react-router-dom';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import productDetail from './products.json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const { category } = useParams(); // Get category from URL
  const categoryProducts = productDetail.product[category] || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDealerClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="productPage">
      <div className="productTopBanner">
        <div className="productTopBannerItems">{category}</div>
      </div>

      <div className="productsPageMainRightTopBanner">
        Showing {categoryProducts.length} results for 
        <span className='productsPageMainRightTopBannerSpan'> {category}</span>
      </div>

      <div className="itemsImageProductPage">
        {categoryProducts.map((item) => (
          <div className='itemsImageProductPageOne' key={item.id}>
            <div className='imgBloCkitemsImageProductPageOne'>
              <img src={item.imageUrl} className='productImageProduct' alt={item.name} />
            </div>
            <div className='productNameProduc'>
              <div>{item.name}</div>
              <div className='productNameProductRating'>
                {[1, 2, 3, 4].map((i) => <StarRateIcon key={i} sx={{ fontSize: "16px", color: "#febd69" }} />)}
                <StarOutlineIcon sx={{ fontSize: "16px", color: "#febd69" }} />
              </div>
              <div className='priceProductDetailPage'>
                <div className='currencyText'>₹</div>
                <div className='rateHomeDetail'>
                  <div className='rateHomeDetailsPrice'>{item.price}</div>
                </div>
              </div>
              <div className='offProductPage'>Ex-Showroom price, Mumbai</div>
              <div className='freeDeliveryHomepage'>
                <button className='addtobasketBtn' onClick={() => handleDealerClick(item)}>
                  Dealer Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dealer Details Modal */}
      {showModal && selectedProduct && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>Dealer Details</h2>
            <p><strong>Car:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <p><strong>Location:</strong> Mumbai</p>
            <p><strong>Contact:</strong> +91-9876543210</p>
            <button onClick={() => setShowModal(false)} className="closeModalBtn">Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Products;
