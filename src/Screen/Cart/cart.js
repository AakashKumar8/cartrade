import React, { useState, useEffect } from 'react';
import './cart.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Component/firebase';

const Cart = () => {
    const [formData, setFormData] = useState({
        sellerName: '',
        city: '',
        address: '',
        carType: '',
        model: '',
        color: '',
        fuelType: '',
        contact: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            toast.info('Please login to list your car.', { position: 'bottom-right' });
            setTimeout(() => navigate('/LoginPage'), 2000);
            return;
        }

        console.log('Car listed:', formData);
        toast.success('Car listed successfully!', { position: 'bottom-right' });

        setFormData({
            sellerName: '',
            city: '',
            address: '',
            carType: '',
            model: '',
            color: '',
            fuelType: '',
            contact: '',
        });
    };

    return (
        <div className="cart sell-car-form">
            <h2 className="mainHeading">Sell Your Car</h2>
            <p className="subHeading">Enter your car and contact details below</p>

            <form onSubmit={handleSubmit} className="horizontalForm">
                <div className="formRow">
                    <input type="text" name="sellerName" placeholder="Seller Name" value={formData.sellerName} onChange={handleChange} required />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="formRow">
                    <input type="text" name="carType" placeholder="Car Type" value={formData.carType} onChange={handleChange} required />
                    <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
                    <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
                </div>
                <div className="formRow">
                    <select name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                        <option value="">Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                        <option value="Electric">Electric</option>
                    </select>
                    <input type="tel" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
                    <div></div> {/* Empty div to maintain 3-column layout */}
                </div>
                <div className="formButtonWrapper">
                    <button type="submit" className="submitCarButton">List My Car</button>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Cart;
