import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addPostData,editPostData,fetchData,fetchDataLoad,addData} from './request';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';
import {useFormik} from 'formik';
import { months } from "./months";
import { years } from "./years";
import { useDynamicYears } from "./years";
import { lastDayOfMonth, startOfMonth, getMonth, getYear } from "date-fns";

function Blogs() {
  const dynamicYears = useDynamicYears({
    startingYear: 2021,
    numberOfYears: 3
  });

  
  const [posts, setPosts] = useState([]);
  const id = 13;
  {/*Add modal*/}
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!false)
  }
  const initModalhide = () => {
    return invokeModal(false)
  }

   {/*Edit modal*/}
  const [iseditShow, editModal] = React.useState(false)
  const initEditModal = (info) => {
    console.log(info)
    formikedit.setFieldValue("id",info.id);
    formikedit.setFieldValue("month",info.month);
    formikedit.setFieldValue("year",info.year);
    formikedit.setFieldValue("volume",info.volume);
    return editModal(!false)
  }
  const initEditModalhide = () => {
    return editModal(false)
  }

   {/*Edit modal*/}
  const [showResults, setShowResults] = React.useState(false)
  const [noshowResults, nosetShowResults] = React.useState(true)

  
{/*Validation for add modal*/}
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

  {/*Validation for Edit modal*/}
  const validateeditData = empData => {
    const errors = {};
  
    if (!empData.volume) {
      errors.volume = 'Please Enter Volume';
    } 
    return errors;
  };

  {/*Fetch Table Data*/}
  useEffect(() => {
    var config = { "Access-Control-Allow-Origin": "*" }
    fetchDataLoad(config, (res) => {
      setPosts(res.data.items);
    }, (err) => {
      //error
      alert(err);
      setShowResults(true)
      nosetShowResults(false)
    });
  },
    []);

  const formik=useFormik({
    initialValues:{
      month:'',
      year:'',
      volume:''
    },
    validate: validateData,
    onSubmit: (values,{ resetForm }) => {
      var config = { "Access-Control-Allow-Origin": "*" }
      addPostData(values, config, (res) => {
      }, (err) => {
        //error
        alert(err);
      });
      resetForm();
    }
  });
  const formikfilter=useFormik({
    initialValues:{
      month:'',
      year:'',
      volume:''
    },
  //  validate: validatefData,
    onSubmit: values => {
    //  resetForm();
    var config = { "Access-Control-Allow-Origin": "*" }
    fetchData(values.year, config, (res) => {
      setPosts(res.data.items);
    }, (err) => {
      //error
      alert(err);
      setShowResults(true)
      nosetShowResults(false)
    });
    }
  });
  const formikedit=useFormik({
    initialValues:{
      id:'',
      month:'',
      year:'',
      volume:''
    },
    validate: validateeditData,
    onSubmit: values => {
      console.log(values);
    //  resetForm();
    var config = { "Access-Control-Allow-Origin": "*" }
    editPostData(values, config, (res) => {
      setPosts(res.data.items);
    }, (err) => {
      //error
    });
    }
  });
  const Results = () => (
    <div id="results" className="search-results">
      No data found
    </div>
  )
  const NonResults = () => (
    <table className="table table-bordered">
    <thead>
      <tr>
        <th>Month</th>
        <th>Year</th>
        <th>Volume</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => {
        return (
          <tr key={post.id}>
            <td>{post.month}</td>
            <td>{post.year}</td>
            <td>{post.volume}</td>
            <td><button onClick={()=>{initEditModal(post)}} className='btn btn-primary px-4 py-1' type="button">Edit</button></td>
          </tr>
        )
      })}
    </tbody>
  </table>
  )
  return (
    <>
     <div>
    </div>
      <div className='mt-3 row mx-0'>
        <div className='d-block '>
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
        <div className='d-block my-3 me-2 float-end'> <Button variant="success" onClick={initModal}>Open Modal</Button></div>
        </div>
        <div className='d-block text-center mt-5'>{ showResults ? <Results /> : null }</div>
        <div>   { noshowResults ? <NonResults /> : null }</div>
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

      {/* Edit Modal*/}
      
      <Modal show={iseditShow}>
        <Modal.Header closeButton onClick={initEditModalhide}>
          <Modal.Title>Add Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formikedit.handleSubmit}>
            <div className="form-group mb-3">
            <input type="hidden" className="form-control" name="id" id="id" value={formikedit.values.id}
                onChange={formikedit.handleChange}></input>

              <label htmlFor="month">Enter Month : </label>
              <select className="form-select" name="month" id="month" value={formikedit.values.month} onChange={formikedit.handleChange} onBlur={formikedit.handleBlur}>
             <option value="">Select Month</option>
                {months.map((key, index) => (
                  <option value={key} key={index}>
                    {key}
                  </option>
                ))}
              </select>
              {formikedit.touched.month && formikedit.errors.month ? <span style={{ color: 'red' }}>{formikedit.errors.month}</span> : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="year">Enter Year : </label>
              <select className="form-select" name="year" id="year" value={formikedit.values.year} onChange={formikedit.handleChange} onBlur={formikedit.handleBlur}>
              <option value="">Select Year</option>
                {dynamicYears.map((key, index) => (
                  <option value={key} key={index}>
                    {key}
                  </option>
                ))}
              </select>
              {formikedit.touched.month && formikedit.errors.year ? <span style={{ color: 'red' }}>{formikedit.errors.year}</span> : null}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="volume">Enter Volume : </label>
              <input type="number" className="form-control" name="volume" id="volume" value={formikedit.values.volume}
                onChange={formikedit.handleChange}></input>
              {formikedit.touched.volume && formikedit.errors.volume ? <span style={{ color: 'red' }}>{formikedit.errors.volume}</span> : null}
            </div>
            
            <button className="btn btn-primary float-end mt-3"  type="submit">Update Data</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );

}

export default Blogs;

