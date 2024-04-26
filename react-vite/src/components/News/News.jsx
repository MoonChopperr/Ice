import './News.css'
// import Footer from '../Footer/Footer'

function News() {
    return (
        <>
            <div className="News-container">
                <div className='News-title'>News</div>
                <div className="News-Card-container">
                    <div className='News-card'>
                        There are currently no news...
                    </div>
                    <div className='News-card'>
                        In the mean time would you like to checkout my&nbsp;<span><a className='News-link' href="https://github.com/MoonChopperr/Ice">github</a></span>&nbsp;or&nbsp;<span><a className='News-link' href="https://moonchopper.netlify.app/">Portfolio</a></span>?
                    </div>
                </div>

            </div>
            {/* <Footer/> */}
        </>
    )
}

export default News
