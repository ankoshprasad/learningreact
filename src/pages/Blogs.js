import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from './request';
import { addData } from './request';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';
import {useFormik} from 'formik';


function Blogs() {
 
  const [posts, setPosts] = useState([]);
  const [reposts, resetPosts] = useState([]);
  const [submitposts, submitsetPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const year = 2023;
  const id = 13;
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!false)
  }
  const initModalhide = () => {
    return invokeModal(false)
  }
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
   
  }

  const validateData = empData => {
    const errors = {};
  
    if (!empData.month) {
      errors.month = 'Please Enter Month';
    } else if (empData.month.length > 30) {
      errors.month = 'Month cannot exceed 30 characters';
    }
  
    if (!empData.year) {
      errors.year = 'Please Enter year';
    } 

    if (!empData.volume) {
      errors.volume = 'Please Enter volume';
    } 
  
  
    return errors;
  };

  useEffect(() => {
    axios.get('http://localhost/REST-APIS/items/read')
      .then(response => {
        setPosts(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost/REST-APIS/items/read?year=' + year)
      .then(response => {
        console.log(response)
        resetPosts(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
    {/*}
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
        */}
  },
    []);

  const shoot = () => {
    axios.post('http://localhost/REST-APIS/items/delete', { id }).then(response => {
      console.log(response)
      submitsetPosts(response.data);
    })
      .catch(error => {
        console.error(error);
      });

  }

  const fetchfromservice = () => {
    var config = { "Access-Control-Allow-Origin": "*" }
    addData(year, config, (res) => {
      console.log(res)
    }, (err) => {
      //error
      alert(err);
    });
  }

  const addDatafromservice = () => {
    var config = { "Access-Control-Allow-Origin": "*" }
    addData(id, config, (res) => {
      console.log(res)
    }, (err) => {
      //error
      alert(err);
    });
  }

  const addPosts = async (id) => {
    await fetch('http://localhost/REST-APIS/items/delete', {
      method: 'POST',
      body: JSON.stringify({
        id: 100
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        submitsetPosts((posts) => [data, ...posts]);
        setTitle('');
        setBody('');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const formik=useFormik({
    initialValues:{
      month:'',
      year:'',
      volume:''
    },
    validate:validateData,
    onSubmit:values=>{
      alert(JSON.stringify(values));
    }
  });

  return (
    
    <>
     {/*
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.month}</li>
        ))}
      </ul>
      <ul>
        {reposts.map(post => (
          <li key={post.id}>{post.month}</li>
        ))}
      </ul>
      <button onClick={addDatafromservice}>Take the shot!</button>
      */}
      <div className='mt-3'>
        <div className='my-3 me-2 float-end'> <Button variant="success" onClick={initModal}>Open Modal</Button></div>
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              return (
                <tr key={post.id}>
                  <td>{post.month}</td>
                  <td>{post.year}</td>
                  <td>{post.volume}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModalhide}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
           
            <div class="form-group mb-3">
              <label htmlFor="month">Enter Month : </label>
              <input type="text" class="form-control" name="month" id="month" value={formik.values.month}
                onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              {formik.touched.month && formik.errors.month ? <span style={{ color: 'red' }}>{formik.errors.month}</span> : null}
            </div>

            <div class="form-group mb-3">
              <label htmlFor="year">Enter Year : </label>
              <input type="number" class="form-control" name="year" id="year" value={formik.values.year}
                onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              {formik.touched.year && formik.errors.year ? <span style={{ color: 'red' }}>{formik.errors.year}</span> : null}
            </div>

            <div class="form-group mb-3">
              <label htmlFor="volume">Enter Volume : </label>
              <input type="number" class="form-control" name="volume" id="volume" value={formik.values.volume}
                onChange={formik.handleChange}></input>
              {formik.touched.volume && formik.errors.volume ? <span style={{ color: 'red' }}>{formik.errors.volume}</span> : null}
            </div>
            
            <button className="btn btn-primary float-end mt-3" type="submit">Add Data</button>
          </form>

        </Modal.Body>
      
      </Modal>
    </>
  );

}

export default Blogs;

