import './Layout.css'
import { useNavigate } from 'react-router-dom'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import MyAccount from '../My_Account/MyAccount'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

const Layout = (props) => {
  const [{logged},dispatch] = useDataLayerValue();
  const navigate = useNavigate();

  const RegisterNavigateTeacher = () => {
    navigate('/register', { state: { name: 'Teacher' } });
  };

  const RegisterNavigateStudent = () => {
    navigate('/register', { state: { name: 'Student' } });
  };
  const LoginNavigate = () => {
    console.log("Here you go ",logged);
    navigate('/login');
  };
  return (
    <>
      <div className="out-wrap">
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8o-yBumI9pzBAgBD4G6Wnvi5rP2F9AtZUg&s" alt="Logo" className='layout-img'/>
        </div>
           <div className='links-wrapper'>
            <div className={`nav-links ${logged ? `invis`: ``}`}>
              <div className="itms-cntr style-links">
                <img
                  src="https://img.icons8.com/?size=50&id=38HJBFwphJ3I&format=png"
                  className="img-sz"
                  alt="Teacher Icon"
                />
                <span onClick={RegisterNavigateTeacher}>Register as Teacher</span>
              </div>
              <div className="itms-cntr style-links">
                <img
                  src="https://img.icons8.com/?size=64&id=48800&format=png"
                  className="img-sz"
                  alt="Student Icon"
                />
                <span onClick={RegisterNavigateStudent}>Register as Student</span>
              </div>
              <div className="itms-cntr style-links">
                <img
                  src="https://img.icons8.com/?size=50&id=26211&format=png"
                  className="img-sz"
                  alt="Login Icon"
                />
                <span onClick={LoginNavigate}>Login</span>
              </div>
          </div>
             <div className={`${logged ? `nav-btm-flx`:``}`}>
              <div className='nav-links-bottom'>
                 <div className='itms-cntr style-links'>
                    <SearchIcon/>
                     <p>Search</p>
                 </div>
                 <div className='itms-cntr style-links'>
                    <HomeIcon/>
                    <p>Home</p>
                  </div>
              </div>
              <div className={`${!logged?'invis':''}`}>
                <MyAccount/>
              </div>
             </div>
        
        </div>
      </div>
      <div className="content">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
