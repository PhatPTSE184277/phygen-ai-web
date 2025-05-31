import React from 'react';
import FB from '../../img/FB.png';
import X from '../../img/X.png';
import YT from '../../img/YT.png';
import TT from '../../img/TT.png';
import './index.scss';

const Footer = () => {
    return (
        <>
            <section className='footer'>
                <div className='footer__wrapper'>
                    <div>
                        <h5>Support</h5>
                        <p>Help Center</p>
                        <p>Safety information</p>
                        <p>Cancellation options</p>
                    </div>

                    <div>
                        <h5>Company</h5>
                        <p>About us</p>
                        <p>Privacy policy</p>
                        <p>Community Blog</p>
                        <p>Terms of service</p>
                    </div>

                    <div>
                        <h5>Contact</h5>
                        <p>FAQ</p>
                        <p>Get in touch</p>
                        <p>Partnerships</p>
                    </div>

                    <div className='social'>
                        <h5>Social</h5>
                        <img src={FB} alt='' />
                        <img src={X} alt='' />
                        <img src={TT} alt='' />
                        <img src={YT} alt='' />
                    </div>
                </div>
                <div className='border' />
                <div className='footer__bottom'>
                    <h6>© Copyright Acenda 2025</h6>
                </div>
            </section>
        </>
    );
};

export default Footer;