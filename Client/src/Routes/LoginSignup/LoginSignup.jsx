// Import dependencies 
import { useState } from "react";


// Component for login page
export default function LoginSignup() {

const [activeTab, setActiveTab] = useState('login');
const [inputs, setInputs]  = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',

});
// const [currentStatusMessage, currentStatusMessage] = useState(null);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setInputs({ ...inputs, [name]: value });
};

const handleSubmit = (event) => {
  event.preventDefault();
  // Add login or signup logic
  if (activeTab === 'login') {
    console.log('Login', inputs);
    // need to add logic to handle login
  } else {
    console.log('Sign up', inputs);
  }
};

  return (
   <main className="login-signup-page"> 
    <div className="login-signup-content">
      <img className="LOGO" src="/PICS/LOGO.png" alt="Logo" />
    <div className="tabs">
      <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
        <span className="login-header"> Login </span>
        <div className="indicator" style={{ backgroundColor: activeTab === 'login' ? 'yellow' : 'transparent'}}></div>
      </div>
      <div className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}> 
      <span className="signup-header"> Signup</span>
      <div className="indicator" style={{ backgroundColor: activeTab === 'signup' ? 'green' : 'transparent'}}> </div>
      </div>
    </div>

    <div id='loginForm' className="tabContent" style={{ display: activeTab === 'login' ? 'block' : 'none'}}> 
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label><br />
          <input type="email" id="email" name="email" value={inputs.email} onChange={handleInputChange} /><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" id="password" name="password" value={inputs.password} onChange={handleInputChange} /><br /><br />
          <button className="login-button" type="submit">Login</button>
        </form>
    </div>

    <div id="signupForm" className="tab-content" style={{ display: activeTab === 'signup' ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label><br />
          <input type="text" id="firstName" name="firstName" value={inputs.firstName} onChange={handleInputChange} /><br />
          <label htmlFor="lastName">Last Name</label><br />
          <input type="text" id="lastName" name="lastName" value={inputs.lastName} onChange={handleInputChange} /><br />
          <label htmlFor="email">Email</label><br />
          <input type="email" id="email" name="email" value={inputs.email} onChange={handleInputChange} /><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" id="password" name="password" value={inputs.password} onChange={handleInputChange} /><br />
          <label htmlFor="confirm_password">Confirm Password</label><br />
          <input type="password" id="confirm_password" name="confirm_password" value={inputs.confirm_password} onChange={handleInputChange} /><br /><br />
          <button className="signUp-button" type="submit">Sign Up</button>
        </form>
        </div>
      </div>

   </main>
   );
}
