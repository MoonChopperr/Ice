import './NavBar2.css'
import { IoMdSearch } from "react-icons/io";


function NavBar2() {
    return (
        <>
            <div className='NavBar2-container'>
                <div className="rectangle-bar">
                    <a onClick={() => alert('Feature coming soon')}>Your Store</a>
                    <a onClick={() => alert('Feature coming soon')}>New & Noteworthy</a>
                    <a onClick={() => alert('Feature coming soon')}>Categories</a>
                    <a onClick={() => alert('Feature coming soon')}>Points Shop</a>
                    <a onClick={() => alert('Feature coming soon')}>News</a>
                    <a onClick={() => alert('Feature coming soon')}>Labs</a>
                    <div className="search-bar">
                        <input type="text" placeholder="search" />
                        <button onClick={() => alert('Feature coming soon')}><IoMdSearch /></button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default NavBar2
