import './Home.css'
import Search from '../Search/Search'
import { useState } from 'react';
const Home = (props) => {
  const [srch,setSrch] = useState(false)
  return (
    <>
    <div className='top-wst'></div>
      <div className="home-wrap">
        <div className="home-content">
          {srch?<Search/> :
          <>
            <h1>Find the Teacher best suits your needs</h1>
            <button className="home-srch-btn" onClick={()=>setSrch(true)}>Start Search</button>
          </>
          }
        </div>
        <div className="home-img-div">
          <img
            src="https://www.brunel.ac.uk/news-and-events/news/images/tuition-920.jpg?q=70&f=webp"
            className="home-img"
          ></img>
        </div>
      </div>
      <div className="about-div">
        <h1 className='about-h1'>About Us</h1>
        <p className='about-para'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, amet
          laboriosam. Ipsa, consequatur! Reiciendis recusandae quisquam
          deleniti, similique harum cupiditate animi corrupti, doloremque
          dolorum nemo exercitationem tempora fugiat? Adipisci, est?
        </p>
      </div>
    </>
  );
}
export default Home