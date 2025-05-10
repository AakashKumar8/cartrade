import React from 'react'
import './homeBanner.css'
import homeBannerItemProduct from '../../../homeProduct.json';
const HomeBanner = () => {
    return (
        <div className="homeBanner">
            <img className='homeBannerimg' src='https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
            <div className="grayBackgroundHomeBanner"></div>

            <div className="homeBannerItemDiv">

                {
                    homeBannerItemProduct.product.map((item, ind) => {
                        return (
                            <div className="homeBannerItemDivCard">
                                <div className="homeBannerItemDivCardTitle">{item.itemTitle}</div>
                                <div className="imgHomeBannerItemDivCard">
                                    {
                                        item.imgs.map((it, ind )=> {
                                            return (
                                                <div className="imgBannerHomeDiv">
                                                    <img className='imgBannerHomeDivImg' src={it} />
                                                    <div className="imgBannerImgName">{item.dtls}</div>
                                                </div>
                                            );

                                        })
                                    }




                                </div>

                                <div className="seeMoreHomeBanner">See More</div>
                            </div>
                        );
                    })
                }






            </div>

        </div>
    )
}

export default HomeBanner