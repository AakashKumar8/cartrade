import React from 'react';
import './homeDetails.css';

const HomeDetails = () => {
  const cars = [
    {
      name: 'Tesla Model S',
      img: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg',
      discount: 'Up to 10% off',
    },
    {
      name: 'BMW i8',
      img: 'https://imgd.aeplcdn.com/642x336/cw/ec/18023/BMW-i8-Exterior-114972.jpg?wm=0&q=80',
      discount: 'Up to 15% off',
    },
    {
      name: 'Audi R8',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2020_Audi_R8_V10_5.2_Front.jpg/1200px-2020_Audi_R8_V10_5.2_Front.jpg',
      discount: 'Up to 12% off',
    },
    {
      name: 'Mercedes-Benz AMG GT',
      img: 'https://imgd.aeplcdn.com/1056x594/n/k60a6sa_1475130.jpg?q=80',
      discount: 'Up to 20% off',
    },
    {
      name: 'Porsche Taycan',
      img: 'https://img.autocarindia.com/model/uploads/modelimages/Porsche-Taycan-130320251511.jpg?w=750&h=500&q=90&c=1',
      discount: 'Up to 18% off',
    },
    {
      name: 'Lamborghini Huracán',
      img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/185153/lamborghini-huracan-evo-right-front-three-quarter7.jpeg?isig=0&wm=1&q=80',
      discount: 'Up to 14% off',
    },
    {
      name: 'Ford Mustang Mach-E',
      img: 'https://img.autocarindia.com/ExtraImages/20210910102859_Ford_Mustang_mach_e.jpeg',
      discount: 'Up to 11% off',
    },
    {
      name: 'Chevrolet Corvette C8',
      img: 'https://img.autocarindia.com/ExtraImages/20190719102922_c8-corvette-12.jpg?w=700&c=1',
      discount: 'Up to 16% off',
    }
  ];

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
