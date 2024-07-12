// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Layout from './layout';
// import LoginPage from './login';
// import RegisterPage from './register';
// import HomePage from './home';
// import Navbar from './navbar';

// ReactDOM.render(
//   <BrowserRouter>
//     <Layout>
//       <Navbar />
//       <Switch>
//         <Route exact path="/auth" component={LoginPage} />
//         <Route exact path="/register" component={RegisterPage} />
//         <Route exact path="/" component={HomePage} />
//         {/* Add additional routes here if needed */}
//       </Switch>
//     </Layout>
//   </BrowserRouter>,
//   document.getElementById('root')
// );


// this one is ok and working so work on it
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom';
// import './index.css';
// import './static/todo/css/bootstrap.css';

// import Layout from './layout';
// import LoginPage from './login';
// import RegisterPage from './register';
// import HomePage from './home';
// import Navbar from './navbar';

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Layout>
//       <Navbar />
//       <Routes>
//         <Route path="/auth" element={<LoginPage />} />
//         <Route path="/" element={
//           <div>
//             <RegisterPage />
//             <HomePage />
//           </div>
//         } />
//       </Routes>
//     </Layout>
//   </BrowserRouter>
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom';
// import './index.css';
// import './static/todo/css/bootstrap.css';

// import Layout from './layout';
// import LoginPage from './login';
// import RegisterPage from './register';
// import HomePage from './home';
// import Navbar from './navbar';
// import ResetPassword from './resetPassword';
// import EditTodo from './editTodo';
// import AddTodo from './add-todo';


// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Layout>
//       <Navbar />
//       <Routes>
//         <Route path="/auth" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/resetPassword" element={<ResetPassword />} />
//         <Route path="/editTodo" element={<EditTodo />} />
//         <Route path="/add-todo" element={<AddTodo />} />




//       </Routes>
//     </Layout>
//   </BrowserRouter>
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { createRoot } from 'react-dom';
// import './index.css';
// import './static/todo/css/bootstrap.css';

// import Layout from './layout';
// import LoginPage from './login';
// import RegisterPage from './register';
// import HomePage from './home';
// import Navbar from './navbar';
// import ResetPassword from './resetPassword';
// import EditTodo from './editTodo';
// import AddTodo from './add-todo';

// // Function to check if the user is logged in (replace with your own logic)
// const isLoggedIn = () => {
//   // Example logic: Check if user is authenticated or if there is a token in localStorage
//   return !!localStorage.getItem('token');
// };

// // Function to render either LoginPage or RegisterPage+HomePage based on login status
// const renderAppRoutes = () => {
//   return (
//     <Routes>
//       {/* Routes accessible before login */}
//       <Route path="/auth" element={<LoginPage />} />
//       <Route path="auth/register" element={<RegisterPage />} />
//       <Route path="auth/resetPassword" element={<ResetPassword />} />

//       {/* Routes accessible after login */}
//       <Route
//         path="/todos"
//         element={isLoggedIn() ? <HomePage /> : <Navigate to="/auth" />}
//       />
//       <Route
//         path="/editTodo"
//         element={isLoggedIn() ? <EditTodo /> : <Navigate to="/auth" />}
//       />
//       <Route
//         path="/add-todo"
//         element={isLoggedIn() ? <AddTodo /> : <Navigate to="/auth" />}
//       />
//     </Routes>
//   );
// };

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Layout>
//       <Navbar />
//       {renderAppRoutes()}
//     </Layout>
//   </BrowserRouter>
// );



// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { createRoot } from 'react-dom';
// import './index.css';
// import './static/todo/css/bootstrap.css';

// import Layout from './layout';
// import LoginPage from './login';
// import RegisterPage from './register';
// import HomePage from './home';
// import Navbar from './navbar';
// import ResetPassword from './resetPassword';
// import EditTodo from './editTodo';
// import AddTodo from './add-todo';

// // Function to check if the user is logged in (replace with your own logic)
// const isLoggedIn = () => {
//   // Example logic: Check if user is authenticated or if there is a token in localStorage
//   return !!localStorage.getItem('token');
// };

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Layout>
//       <Navbar />
//       <Routes>
//         {/* Routes accessible before login */}
//         <Route path="/auth" element={<LoginPage />} />
//         <Route path="/auth/register" element={<RegisterPage />} />
//         <Route path="/auth/resetPassword" element={<ResetPassword />} />

//         {/* Routes accessible after login */}
//         <Route
//           path="/todos"
//           element={isLoggedIn() ? <HomePage /> : <Navigate to="/auth" />}
//         />
//         <Route
//           path="/todos/add-todo"
//           element={isLoggedIn() ? <AddTodo /> : <Navigate to="/auth" />}
//         />
//         <Route
//           path="/todos/edit-todo/:todoId"
//           element={isLoggedIn() ? <EditTodo /> : <Navigate to="/auth" />}
//         />
//       </Routes>
//     </Layout>
//   </BrowserRouter>
// );





import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import './static/todo/css/bootstrap.css';

import Layout from './layout';
import LoginPage from './login';
import RegisterPage from './register';
import HomePage from './home';
import Navbar from './navbar';
import ResetPassword from './resetPassword';
import EditTodo from './editTodo';
import AddTodo from './add-todo';

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Navbar />
      <Routes>
        {/* Routes accessible before login */}
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/resetPassword" element={<ResetPassword />} />

        {/* Routes accessible after login */}
        <Route
          path="/todos"
          element={<HomePage />}
        />
        <Route
          path="/todos/add-todo"
          element={<AddTodo />}
        />
        <Route
          path="/todos/edit-todo/:todoId"
          element={<EditTodo />}
        />
        {/* Add more routes here */}
      </Routes>
    </Layout>
  </BrowserRouter>,
  document.getElementById('root')
);
