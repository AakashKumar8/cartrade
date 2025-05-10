import React from 'react'
import './footer.css';
import CarTrade from '../../Assets/CarTrade.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer">
            <div className="footerContent">
                <div className="footerCont1">
                    <div className="contentFooterTitle">Get To Know Us</div>
                    <div className='contentFooterSubTitlediv'>
                        <div className='contentFooterSubTitleCont'><a href="https://www.cartrade.com/company/about-us/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a></div>
                        <div className='contentFooterSubTitleCont'><a href="https://www.cartrade.com/company/terms/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</a></div>                        
                    </div>

                </div>
                <div className="footerCont1">
                    <div className="contentFooterTitle">Connect With Us</div>
                    <div className="contentFooterSubTitlediv">
                        <div className="contentFooterSubTitleCont"><a href="https://www.instagram.com/singh_aak_10/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>Instagram</a></div>
                        <div className="contentFooterSubTitleCont">Twitter</div>
                        <div className="contentFooterSubTitleCont"><a href="https://www.facebook.com/Aakashsingh3jp" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>Facebook</a></div>
                    </div>
                </div>

                
                <div className="footerCont1">
                    <div className="contentFooterTitle">Lets Us Help You</div>
                    <div className="contentFooterSubTitlediv">
                        <div className="contentFooterSubTitleCont">Your Account</div>
                        <div className="contentFooterSubTitleCont">Returns Center</div>
                        <div className="contentFooterSubTitleCont">CarTrade</div>
                    </div>
                </div>
            </div>
            <div className="amazonImg">
                <img className='amazonImgFooter' src={CarTrade} />
            </div>
        </div>
    )
}

export default Footer