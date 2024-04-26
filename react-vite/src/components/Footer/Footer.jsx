import './Footer.css'
// import { FaGithubSquare, FaLinkedin, FaFolderOpen } from "react-icons/fa";
import footerlogo from '../../images/footerLogo.png'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const nav = useNavigate()

    return (
        <>
            <div className="footer">
                <div className='footer-card'>
                    <hr className='footer-hr' />
                    <div className="footer-content">
                        <span>
                            <img className="footer-logo" src={footerlogo} alt='Home'></img>
                        </span>
                        <div>
                            © 2024 Ryou Nishiyama. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                            <br />
                            <div className='footer-second-line'>
                                <span>VAT included in all prices where applicable.</span>

                                <span>
                                    <a className='footer-icon-links-1' href="https://github.com/MoonChopperr/Ice">Github</a><span> | </span>
                                </span>
                                <span>
                                    <a className='footer-icon-links' href="https://www.linkedin.com/in/nishiyamaryou/">LinkedIn</a><span> | </span>
                                </span>
                                <span>
                                    <a className='footer-icon-links' href="https://moonchopper.netlify.app/">Portfolio</a><span> | </span>
                                </span>
                                <span>
                                    <a className='footer-icon-links' onClick={() => nav('/support')}>FAQ</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr className='footer-hr' />
                    {/* <div className='footer-icons-container'>
                        <a className='footer-icons' href="https://www.linkedin.com/in/nishiyamaryou/"><FaLinkedin /></a> |
                        <a className='footer-icons' href="https://github.com/MoonChopperr"><FaGithubSquare /></a> |
                        <a className='footer-icons' href="https://moonchopper.netlify.app/"><FaFolderOpen /></a>
                    </div> */}
                </div>

            </div>
        </>
    )
}

export default Footer
