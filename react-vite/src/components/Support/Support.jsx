import { useSelector } from 'react-redux';
import './Support.css'

function Support() {

    const currUser = useSelector(state => state.session.user)



    return (
        <>
            <div className='SUP-BG-container'>
                <div className='SUP-main-container'>
                    <div className='SUP-title'>Ice Support</div>
                    <div className='SUP-subtext'>What do you need help with, {currUser ? currUser.username : 'guest'}?</div>
                    <div className='SUP-early-container'>
                        <div className='SUP-early-title'>HAVING TROUBLE ACCESSING AN ICE FEATURE?</div>
                        <div className='SUP-early-description'>
                            Accounts are limited from using most of Ice&apos;s features. You&apos;ll have access to all of Ice&apos;s features when Ryou Nishiyama implements it. Some of the features that you won&apos;t be able to access are:
                            <li className='SUP-early-description'>Adding friends on Steam</li>
                            <li className='SUP-early-description'>Changing Language</li>
                            <li className='SUP-early-description'>Changing account details after creation</li>
                            <li className='SUP-early-description'>Gifting Games</li>
                        </div>
                        <div className='SUP-early-description2'>
                            Accounts will have acccess to the following features:
                            <li className='SUP-early-description'>Create, read, update, and delete <span className='SUP-library'>games</span> that they create</li>
                            <li className='SUP-early-description'>Add games to <span className='SUP-library'>cart</span>, remove and checkout Games</li>
                            <li className='SUP-early-description'>Add and remove games to <span className='SUP-library'>wishlist</span>; update a games rank by priority in the wishlist</li>
                            <li className='SUP-early-description'>View purchased games under <span className='SUP-library'>library</span></li>
                            <li className='SUP-early-description'>Create, read, update, and delete <span className='SUP-library'>reviews</span> on games that a user has purchased</li>
                            <li className='SUP-early-description'><span className='SUP-library'>Vote</span> on how helpful or funny a review is </li>
                            <li className='SUP-early-description'><span className='SUP-library'>Search</span> through the database of games using the search bar</li>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Support
