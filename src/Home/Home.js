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
          {srch?
          <div className='search-home-div'>
              <h1 className='search-h1 lato-bold'>Put your requirements</h1>
              <Search/> 
          </div>
          :
          <div className="home-content">
            <h1 className='home-h1 lato-bold'>Find the Teacher best suits your needs</h1>
            <button className="home-srch-btn" onClick={()=>setSrch(true)}>Start Search</button>
          </div>
          }
        <div className="home-img-div">
            <ImageSlider/>
        </div>
      </div>
    </>
  );
}
export default Home