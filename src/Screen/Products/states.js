import React, { useEffect, useState } from 'react';
import './products.css';
import { useParams } from 'react-router-dom';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../Component/firebase';
import { ref, onValue } from 'firebase/database';

const States = () => {
  const { type } = useParams(); // type = state name (e.g., delhi)
  const [stateProducts, setStateProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const selectedCategoriesRef = ref(db, 'selectedCategories/states');
    const unsubscribeCategories = onValue(selectedCategoriesRef, (snapshot) => {
      const stateExists = snapshot.val() && snapshot.val().includes(type);
      if (stateExists) {
        const productsRef = ref(db, `states/${type}`);
        const unsubscribeProducts = onValue(productsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const productsList = Object.entries(data).map(([id, product]) => ({
              id,
              ...product,
            }));
            setStateProducts(productsList);
          } else {
            setStateProducts([]);
            toast.info(`No products found for ${type}`);
          }
        });

        return () => unsubscribeProducts();
      } else {
        toast.error(`State "${type}" does not exist in categories.`);
      }
    });

    return () => unsubscribeCategories();
  }, [type]);

  const handleDealerClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="productPage">
      <div className="productTopBanner">
        <div className="productTopBannerItems">{type}</div>
      </div>

      <div className="productsPageMainRightTopBanner">
        Showing {stateProducts.length} results for
        <span className="productsPageMainRightTopBannerSpan"> {type}</span>
      </div>

      <div className="itemsImageProductPage">
        {stateProducts.map((item) => (
          <div className="itemsImageProductPageOne" key={item.id}>
            <div className="imgBloCkitemsImageProductPageOne">
              <img src={item.imageUrl} className="productImageProduct" alt={item.name} />
            </div>
            <div className="productNameProduc">
              <div>{item.name}</div>
              <div className="productNameProductRating">
                {[1, 2, 3, 4].map((i) => (
                  <StarRateIcon key={i} sx={{ fontSize: "16px", color: "#febd69" }} />
                ))}
                <StarOutlineIcon sx={{ fontSize: "16px", color: "#febd69" }} />
              </div>
              <div className="priceProductDetailPage">
                <div className="currencyText">₹</div>
                <div className="rateHomeDetail">
                  <div className="rateHomeDetailsPrice">{item.price}</div>
                </div>
              </div>
              <div className="offProductPage">Ex-Showroom price, Mumbai</div>
              <div className="freeDeliveryHomepage">
                <button className="addtobasketBtn" onClick={() => handleDealerClick(item)}>
                  Dealer Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dealer Modal */}
      {showModal && selectedProduct && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>Dealer Details</h2>
            <p><strong>Car:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
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

export default States;
