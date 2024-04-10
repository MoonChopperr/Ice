import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Support.css'

function Support() {

    const currUser = useSelector(state => state.session.user)



    return (
        <>
            <div className='SUP-BG-container'>
                <div className='SUP-main-container'>
                    <div className='SUP-title'>Ice Support</div>
                    <div className='SUP-subtext'>What do you need help with, {currUser.username}?</div>
                    <div className='SUP-early-container'>
                        <div className='SUP-early-title'>HAVING TROUBLE ACCESSING AN ICE COMMUNITY FEATURE?</div>
                        <div className='SUP-early-description'>
                            New accounts are limited from using all of Steam's community features. You'll have access to all of Steam's features once you've spent $5.00 USD in the Steam store or added $5.00 USD to your Steam Wallet. Some of the features that you won't be able to access are:
                            <li>Adding friends on Steam</li>
                            <li>Buying or Selling items on the Steam Community Market</li>
                            <li>Creating a Group on Steam Community</li>
                            <li>Creating user reviews or rating artwork, screenshots, workshop content, or Greenlight submissions</li>
                            <li>Using Friends chat in your Browser or on a Mobile device</li>
                            <NavLink className='SUP-early-nav'>Additional info...</NavLink>
                            {/* remember to link this somewhere random lol */}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Support
