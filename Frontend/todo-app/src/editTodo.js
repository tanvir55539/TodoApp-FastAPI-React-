// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from './layout';

// const EditTodo = () => {
//   const { todoId } = useParams();
//   const [todo, setTodo] = useState({});
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [priority, setPriority] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchTodo = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/todos/${todoId}`);
//         setTodo(response.data);
//         setTitle(response.data.title);
//         setDescription(response.data.description);
//         setPriority(response.data.priority);
//       } catch (error) {
//         console.error('Error fetching todo:', error);
//         setMessage('Failed to fetch todo. Please try again later.');
//       }
//     };
//     fetchTodo();
//   }, [todoId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://127.0.0.1:8000/todos/edit-todo/${todoId}`, { title, description, priority });
//       window.location.href = '/todos';
//     } catch (error) {
//       console.error('Error editing todo:', error);
//       setMessage('Failed to edit todo. Please try again later.');
//     }
//   };

//   return (
//     <Layout>
//       <div className="container">
//         <div className="card">
//           <div className="card-header">
//             Let's edit your todo!
//           </div>
//           <div className="card-body">
//             {message && <div className="alert alert-danger">{message}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Title</label>
//                 <input type="text" className="form-control" value={title}
//                        onChange={(e) => setTitle(e.target.value)} required />
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea className="form-control" value={description}
//                           onChange={(e) => setDescription(e.target.value)} rows="3" required />
//               </div>
//               <div className="form-group">
//                 <label>Priority</label>
//                 <select className="form-control" value={priority}
//                         onChange={(e) => setPriority(e.target.value)}>
//                   <option value="1" selected={priority === '1'}>1</option>
//                   <option value="2" selected={priority === '2'}>2</option>
//                   <option value="3" selected={priority === '3'}>3</option>
//                   <option value="4" selected={priority === '4'}>4</option>
//                   <option value="5" selected={priority === '5'}>5</option>
//                 </select>
//               </div>
//               <button type="submit" className="btn btn-primary">Edit your todo</button>
//               <button onClick={() => { window.location.href = `/todos/delete/${todo.id}` }}
//                       type="button" className="btn btn-danger">Delete</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default EditTodo;





// ====================================
// ====================================


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditTodo = () => {
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/todos/${todoId}`);
        setTodo(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPriority(response.data.priority);
      } catch (error) {
        console.error('Error fetching todo:', error);
        setMessage('Failed to fetch todo. Please try again later.');
      }
    };
    fetchTodo();
  }, [todoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/todos/edit-todo/${todoId}`, { title, description, priority });
      window.location.href = '/todos';
    } catch (error) {
      console.error('Error editing todo:', error);
      setMessage('Failed to edit todo. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Let's edit your todo!
        </div>
        <div className="card-body">
          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title}
                     onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" value={description}
                        onChange={(e) => setDescription(e.target.value)} rows="3" required />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select className="form-control" value={priority}
                      onChange={(e) => setPriority(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Edit your todo</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;


