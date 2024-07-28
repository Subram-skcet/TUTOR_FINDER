import './Layout.css'
import { useNavigate } from 'react-router-dom'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import MyAccount from '../My_Account/MyAccount'
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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8o-yBumI9pzBAgBD4G6Wnvi5rP2F9AtZUg&s" alt="Logo" />
        </div>
        {logged? 
        <MyAccount/>:
            <div className="nav-links">
              <div className="itms-cntr">
                <img
                  src="https://img.icons8.com/?size=50&id=38HJBFwphJ3I&format=png"
                  className="img-sz"
                  alt="Teacher Icon"
                />
                <span onClick={RegisterNavigateTeacher}>Register as Teacher</span>
              </div>
              <div className="itms-cntr">
                <img
                  src="https://img.icons8.com/?size=64&id=48800&format=png"
                  className="img-sz"
                  alt="Student Icon"
                />
                <span onClick={RegisterNavigateStudent}>Register as Student</span>
              </div>
              <div className="itms-cntr">
                <img
                  src="https://img.icons8.com/?size=50&id=26211&format=png"
                  className="img-sz"
                  alt="Login Icon"
                />
                <span onClick={LoginNavigate}>Login</span>
              </div>
          </div>
        }
        
      </div>
      <div className="content">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
