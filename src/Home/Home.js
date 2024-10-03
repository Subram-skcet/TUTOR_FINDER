import './Home.css'
import Search from '../Search/Search'
import { useState } from 'react';
import ImageSlider from './ImageSlider/ImageSlider';


const Home = (props) => {
  const [srch,setSrch] = useState(false)
  return (
    <>
    <div className='top-wst'></div>
      <div className="home-wrap">
        <div className="home-content">
          {srch?
          <>
              <h1 className='search-h1'>Put your requirements</h1>
          <Search /> 
          </>
          :
          <>
            <h1 className='home-h1'>Find the Teacher best suits your needs</h1>
            <button className="home-srch-btn" onClick={()=>setSrch(true)}>Start Search</button>
          </>
          }
        </div>
        <div className="home-img-div">
            {/* <ImageSlider/> */}
        </div>
      </div>
    </>
  );
}
export default Home