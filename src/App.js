import { useEffect, useRef, useState } from 'react';
import Notify from './Notify';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [jobs, setJobs] = useState([]);
  const [notify, setNotify] = useState(null);
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('jobs'));
    if(result) {
      setJobs(result);
    }
  }, []);

  const showNotify = (icon, text) => {
    setNotify({ icon, text });
    setTimeout(() => {
      setNotify(null);
    }, 3000);
  };



  const handleSubmit = () => {
    setJobs((job) => {
      const newJobs = [...job, value];
      localStorage.setItem('jobs', JSON.stringify(newJobs));
      return newJobs;
    });
    showNotify('SUCCESS', 'Item added successfully');
    setValue('');
  }

  const handleDelete = (index) => {
    setJobs((job) => {
      const newJobs = [...job];
      newJobs.splice(index, 1);
      localStorage.setItem('jobs', JSON.stringify(newJobs));
      return newJobs;
    });
    showNotify('ERROR', 'Item deleted'); 
  }

  return (
    <div className="app">
      <h1>Grocery Bud</h1>
      {notify && <Notify icon={notify.icon} text={notify.text} />}
      <input id='user_input' type='text' value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Add Item</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index} >
            <input type='checkbox' onClick={() => setCheckbox(!checkbox)} />
            {checkbox && <del>{job}</del>} {!checkbox && <b>{job}</b>}
            <a href='!#' 
              style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#666', borderRadius: '5px', padding: '0 10px 5px' }} 
              onClick={() => handleDelete(index)}>
                Delete
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
