import React from 'react'
import './footer.css';
import walmart from '../../Assets/walmart.png'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footerContent">
                <div className="footerCont1">
                    <div className="contentFooterTitle">Get To Know Us</div>
                    <div className='contentFooterSubTitlediv'>
                        <div className='contentFooterSubTitleCont'>About Us</div>
                        <div className='contentFooterSubTitleCont'>Careers</div>
                        <div className='contentFooterSubTitleCont'>Press Releases</div>
                    </div>

                </div>
                <div className="footerCont1">
                    <div className="contentFooterTitle">Connect With Us</div>
                    <div className="contentFooterSubTitlediv">
                        <div className="contentFooterSubTitleCont">Instagram</div>
                        <div className="contentFooterSubTitleCont">Twitter</div>
                        <div className="contentFooterSubTitleCont">Facebook</div>
                    </div>
                </div>

                <div className="footerCont1">
                    <div className="contentFooterTitle">Make Money With US</div>
                    <div className="contentFooterSubTitlediv">
                        <div className="contentFooterSubTitleCont">Sell on Walmart</div>
                        <div className="contentFooterSubTitleCont">Sell under Walmart Accelerator</div>
                        <div className="contentFooterSubTitleCont">Protect and Build Your Brand</div>
                        <div className="contentFooterSubTitleCont">Walmart Global Selling</div>
                        <div className="contentFooterSubTitleCont">Become an Affiliate</div>

                    </div>
                </div>
                
                <div className="footerCont1">
                    <div className="contentFooterTitle">Lets Us Help You</div>
                    <div className="contentFooterSubTitlediv">
                        <div className="contentFooterSubTitleCont">Your Account</div>
                        <div className="contentFooterSubTitleCont">Returns Center</div>
                        <div className="contentFooterSubTitleCont">Walmart</div>
                    </div>
                </div>
            </div>
            <div className="amazonImg">
                <img className='amazonImgFooter' src={walmart} />
            </div>
        </div>
    )
}

export default Footer