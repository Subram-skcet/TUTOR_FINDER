import img from '../assets/404img.jpeg'
import './404.css'

const NotFound = () =>{
   return(
    <>
        <div className='top-wst'></div>
        <div className='not-found-wrapper'>

        <div className='not-found-content-wrapper lato-bold'>
            <div className='nf-h1'>
                <h1 className='nf-fnf'>404!</h1>
                <h1>Oops! This Page doesn't exist. But your curiosity is impressive! 👏</h1>   
                <p className='nfp-p'>Try navigate home or explore other pages</p> 
            </div>
            <div  className='nf-img-div'>
              <img className="nf-img" src={img} alt='A lost student'/>
            </div>
        </div>
        </div>
    </>
   )
}

export default NotFound