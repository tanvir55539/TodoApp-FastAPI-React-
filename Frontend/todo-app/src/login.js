import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from './layout';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password}),
      });
      const data = await response.json();
      if (response.ok) {

        localStorage.setItem('access_token', data.access_token); // add new line to correct the home.js
        document.cookie = `access_token=${data.access_token}; path=/; Secure=false`;

        window.location.href = '/todos'; 

      } else {
        console.log(response.ok);
        setMsg(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMsg('An error occurred while logging in');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          {msg && <div className="alert alert-danger" role="alert">{msg}</div>}
          <form onSubmit={handleLogin} method="POST" action="/auth">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
        <div className="card-footer text-muted">
          <a href="/auth/register">Register?</a>
        </div>
        <div className="card-footer text-muted">
          <a href="/auth/forgetPass">Forget Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;




// =============================


// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');

//   const history = useHistory();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/auth/token`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         history.push('/todos'); 
//       } else {
//         setMsg('Login failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMsg('An error occurred while logging in');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-header">Login</div>
//         <div className="card-body">
//           {msg && <div className="alert alert-danger" role="alert">{msg}</div>}
//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label>Username</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 name="username"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 name="password"
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Login</button>
//           </form>
//         </div>
//         <div className="card-footer text-muted">
//           <a href="/auth/register">Register?</a>
//         </div>
//         <div className="card-footer text-muted">
//           <a href="/auth/forgetPass">Forget Password?</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
