import React, { useEffect, useState } from 'react';
import './homeBanner.css';
import homeBannerItemProduct from '../../../homeProduct.json';

const HomeBanner = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100); // Small delay for effect
    }, []);

    return (
        <div className="homeBanner">
            <img
                className="homeBannerimg"
                src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="banner"
            />
            <div className="grayBackgroundHomeBanner"></div>

            <div className="homeBannerItemDiv">
                {homeBannerItemProduct.product.map((item, ind) => (
                    <div
                        key={ind}
                        className={`homeBannerItemDivCard ${fadeIn ? 'fade-slide-in' : ''}`}
                        style={{ transitionDelay: `${ind * 0.2}s` }}
                    >
                        <div className="homeBannerItemDivCardTitle">{item.itemTitle}</div>
                        <div className="imgHomeBannerItemDivCard">
                            {item.imgs.map((it, i) => (
                                <div className="imgBannerHomeDiv bounce-in" key={i}>
                                    <img className="imgBannerHomeDivImg car-hover" src={it} alt="car" />
                                    <div className="imgBannerImgName">{item.dtls}</div>
                                </div>
                            ))}
                        </div>
                        <div className="seeMoreHomeBanner">See More</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeBanner;
