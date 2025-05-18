import React, { useEffect, useState } from 'react';
import './homeDetails.css';
import { db } from '../../../Component/firebase';
import { ref, onValue } from 'firebase/database';

const HomeDetails = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const carsRef = ref(db, 'cars/cars');
    onValue(carsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const carsArray = Object.values(data);
        setCars(carsArray);
      }
    });
  }, []);

  const renderCard = (car) => (
    <div className="homeDetailLongCardItem" key={car.name}>
      <img className='homeDetailLongCardItemImg' src={car.img} alt={car.name} />
      <div className="homeDetailLongCardItemImgDetail">
        <div className="homeDetailLongCardItemImgTopDetail">
          <div className="homeDetailPercentageOff">{car.discount}</div>
          <div className="limitedTimeDealhomeDetail">Limited Time Deal</div>
        </div>
        <div className="bottomHomeDetail">{car.name}</div>
      </div>
    </div>
  );

  const rendersCard = (car) => (
    <div className="homeDetailLongCardItem" key={car.name}>
      <img className='homeDetailLongCardItemImg' src={car.img} alt={car.name} />
      <div className="homeDetailLongCardItemImgDetail">
        <div className="bottomHomeDetail">{car.name}</div>
      </div>
    </div>
  );

  return (
    <div className="homeDetails">
      <div className="homeDetailLongCard">
        <div className="homeDetailLongCardTitle">Today’s Offer</div>
        <div className="homeDetailLongCardItems">
          <div className="scrollDiv">
            {cars.map(renderCard)}
          </div>
        </div>
      </div>

      <div className="homeDetailLongCard">
        <div className="homeDetailLongCardTitle">Today’s Deals</div>
        <div className="homeDetailLongCardItems">
          <div className="scrollDiv">
            {cars.slice(0, 6).map(rendersCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;
