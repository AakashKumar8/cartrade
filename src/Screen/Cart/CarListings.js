import React, { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  push,
  update,
  remove,
  onValue,
} from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { auth } from '../../Component/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './cart.css';

const CarListings = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    state: '',
    city: '',
    address: '',
    carType: '',
    model: '',
    color: '',
    fuelType: '',
    contact: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [listings, setListings] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editId, setEditId] = useState(null);

  const db = getDatabase();
  const storage = getStorage();
  const navigate = useNavigate();

  // Authentication and data listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const listingsRef = ref(db, 'carListings');
    const unsubscribeDb = onValue(listingsRef, (snapshot) => {
      setListings(snapshot.val() || {});
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDb();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      sellerName: '',
      state: '',
      city: '',
      address: '',
      carType: '',
      model: '',
      color: '',
      fuelType: '',
      contact: '',
    });
    setImageFile(null);
    setEditId(null);
  };

  const listingsForEdit = () => {
    for (const stateKey in listings) {
      for (const cityKey in listings[stateKey]) {
        if (listings[stateKey][cityKey][editId]) {
          return listings[stateKey][cityKey][editId];
        }
      }
    }
    return {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.info('Please login to list your car.', { position: 'bottom-right' });
      setTimeout(() => navigate('/LoginPage'), 2000);
      return;
    }

    const { state, city } = formData;
    if (!state || !city) {
      toast.error('Please enter State and City.', { position: 'bottom-right' });
      return;
    }

    try {
      let imageUrl = null;
      let imagePath = null;

      if (imageFile) {
        imagePath = `carImages/${Date.now()}_${imageFile.name}`;
        const imgRef = storageRef(storage, imagePath);
        await uploadBytes(imgRef, imageFile);
        imageUrl = await getDownloadURL(imgRef);
      }

      const listingData = {
        ...formData,
        imageUrl: imageUrl || (editId ? listingsForEdit().imageUrl : null),
        imagePath: imagePath || (editId ? listingsForEdit().imagePath : null),
        createdAt: Date.now(),
      };

      if (editId) {
        const updateRef = ref(db, `carListings/${state}/${city}/${editId}`);

        if (imageFile && listingsForEdit().imagePath) {
          const oldImgRef = storageRef(storage, listingsForEdit().imagePath);
          deleteObject(oldImgRef).catch(console.warn);
        }

        await update(updateRef, listingData);
        toast.success('Listing updated successfully!', { position: 'bottom-right' });
      } else {
        const newRef = ref(db, `carListings/${state}/${city}`);
        await push(newRef, listingData);
        toast.success('Car listed successfully!', { position: 'bottom-right' });
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to list car.', { position: 'bottom-right' });
    }
  };

  const handleEdit = (stateKey, cityKey, id) => {
    const car = listings[stateKey][cityKey][id];
    setFormData({
      sellerName: car.sellerName,
      state: stateKey,
      city: cityKey,
      address: car.address,
      carType: car.carType,
      model: car.model,
      color: car.color,
      fuelType: car.fuelType,
      contact: car.contact,
    });
    setEditId(id);
    setImageFile(null);
  };

  const handleDelete = async (stateKey, cityKey, id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const car = listings[stateKey][cityKey][id];

      if (car.imagePath) {
        const imgRef = storageRef(storage, car.imagePath);
        await deleteObject(imgRef);
      }

      const deleteRef = ref(db, `carListings/${stateKey}/${cityKey}/${id}`);
      await remove(deleteRef);
      toast.success('Listing deleted successfully!', { position: 'bottom-right' });

      if (editId === id) resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete listing.', { position: 'bottom-right' });
    }
  };

  return (
    <div className="car-listings-container">
      <h2>{editId ? 'Edit Car Listing' : 'Sell Your Car'}</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <input name="sellerName" placeholder="Seller Name" value={formData.sellerName} onChange={handleChange} required />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="carType" placeholder="Car Type" value={formData.carType} onChange={handleChange} required />
        <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
        <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
        <select name="fuelType" value={formData.fuelType} onChange={handleChange} required>
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
          <option value="Electric">Electric</option>
        </select>
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        

        <div className="form-buttons">
          <button type="submit">{editId ? 'Update Listing' : 'List My Car'}</button>
          {editId && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <h3>Current Listings</h3>
      <div className="listing-list">
        {Object.entries(listings).map(([stateKey, cities]) =>
          Object.entries(cities).map(([cityKey, cars]) =>
            Object.entries(cars).map(([id, car]) => (
              <div className="listing-card" key={id}>
                <h4>{car.carType} - {car.model}</h4>
                <p><strong>Location:</strong> {car.city}, {car.state}</p>
                <p><strong>Seller:</strong> {car.sellerName}</p>
                <p><strong>Contact:</strong> {car.contact}</p>
                
                <div className="listing-actions">
                  <button onClick={() => handleEdit(stateKey, cityKey, id)}>Edit</button>
                  <button onClick={() => handleDelete(stateKey, cityKey, id)}>Delete</button>
                </div>
              </div>
            ))
          )
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CarListings;
