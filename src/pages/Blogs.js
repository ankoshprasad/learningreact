import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from './request';
import { addData } from './request';
import { addPostData } from './request';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';
import {useFormik} from 'formik';
import { months } from "./months";
import { years } from "./years";
import { useDynamicYears } from "./years";
import { lastDayOfMonth, startOfMonth, getMonth, getYear } from "date-fns";

function Blogs() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const dynamicYears = useDynamicYears({
    startingYear: 2021,
    numberOfYears: 3
  });

  const handleMonthSelect = (e) => {
    const { value } = e.target;
    const month = parseInt(value, 10);
    setSelectedDate(new Date(getYear(selectedDate), month));
  };

  const handleYearSelect = (e) => {
    const { value } = e.target;
    const year = parseInt(value, 10);
    setSelectedDate(new Date(year, getMonth(selectedDate)));
  };
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
  const validatefData = empData => {
    const errors = {};
  
    if (!empData.month) {
      errors.month = 'Please Enter Month';
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
  
{/* Add data 
  const addPostservice = () => {
    var config = { "Access-Control-Allow-Origin": "*" }
    addPostData(dataValue, config, (res) => {
      console.log(res)
    }, (err) => {
      //error
      alert(err);
    });
  }
*/}
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
    validate: validateData,
    onSubmit: (values,{ resetForm }) => {
      alert('hello')
      var config = { "Access-Control-Allow-Origin": "*" }
      addPostData(values, config, (res) => {
        console.log(res)
      }, (err) => {
        //error
        alert(err);
      });
      resetForm();
    }
  });
  const formikfilter=useFormik({
    initialValues:{
      year:''
    },
  //  validate: validatefData,
    onSubmit: values => {
      console.log(values.year);
    //  resetForm();
    var config = { "Access-Control-Allow-Origin": "*" }
    fetchData(values.year, config, (res) => {
      console.log(res)
      setPosts(res.data.items);
    }, (err) => {
      //error
      alert(err);
    });
    }
  });
  
  return (
    <>
      <div className='mt-3'>
        <div className='my-3 me-2 float-start w-60'>
          <form onSubmit={formikfilter.handleSubmit}>
            <div className='d-flex'>
              <div className='mx-4 w-select'>
              <select className="form-select" name="year" id="year" value={formikfilter.values.year} onChange={formikfilter.handleChange} onBlur={formikfilter.handleBlur}>
                  <option value="">ALL</option>
                  {years.map((key, index) => (
                    <option value={key} key={index}>
                      {key}
                    </option>
                  ))}
                </select> 
                {formikfilter.touched.month && formikfilter.errors.month ? <span style={{ color: 'red' }}>{formikfilter.errors.month}</span> : null}

              </div>
              <div>
                <button className="btn btn-primary float-end" type="submit">Filter Data</button>
              </div>
            </div>
          </form>
        </div>
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
          <Modal.Title>Add Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>

            <div className="form-group mb-3">
              <label htmlFor="month">Enter Month : </label>
              <select className="form-select" name="month" id="month" value={formik.values.month} onChange={formik.handleChange} onBlur={formik.handleBlur}>
             <option value="">Select Month</option>
                {months.map((key, index) => (
                  <option value={key} key={index}>
                    {key}
                  </option>
                ))}
              </select>
              {formik.touched.month && formik.errors.month ? <span style={{ color: 'red' }}>{formik.errors.month}</span> : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="year">Enter Year : </label>
              <select className="form-select" name="year" id="year" value={formik.values.year} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <option value="">Select Year</option>
                {dynamicYears.map((key, index) => (
                  <option value={key} key={index}>
                    {key}
                  </option>
                ))}
              </select>
              {formik.touched.month && formik.errors.year ? <span style={{ color: 'red' }}>{formik.errors.year}</span> : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="volume">Enter Volume : </label>
              <input type="number" className="form-control" name="volume" id="volume" value={formik.values.volume}
                onChange={formik.handleChange}></input>
              {formik.touched.volume && formik.errors.volume ? <span style={{ color: 'red' }}>{formik.errors.volume}</span> : null}
            </div>
            
            <button className="btn btn-primary float-end mt-3"  type="submit">Add Data</button>
          </form>

        </Modal.Body>
      
      </Modal>
    </>
  );

}

export default Blogs;

