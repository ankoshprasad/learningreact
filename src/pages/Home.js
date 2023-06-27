import React from 'react';
import ReactDOM from 'react-dom';
import {useFormik} from 'formik';
const validateEmployee = empData => {
  const errors = {};

  if (!empData.Name) {
    errors.Name = 'Please Enter Employee Name';
  } else if (empData.Name.length > 20) {
    errors.Name = 'Name cannot exceed 20 characters';
  }

  if (!empData.Location) {
    errors.Location = 'Please Enter Employee Location';
  } 

  if (!empData.EmailId) {
    errors.EmailId = 'Please Enter Email ID';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.EmailId)) {
    errors.EmailId = 'Invalid email address';
  }

  return errors;
};
const Home = () => {
  const formik=useFormik({
    initialValues:{
      Id:'',
      Name:'',
      Location:'',
      Salary:'',
      EmailId:''
    },
    validate:validateEmployee,
    onSubmit:values=>{
      alert(JSON.stringify(values));
    }
  });
  return (
    <div>
      <h2>New Employee Form...</h2>
      
  <form onSubmit={formik.handleSubmit}>
        <p>
          <label htmlFor="Id">Employee ID : </label>
          <input type="text" name="Id" id="Id" value={formik.values.Id}
                  onChange={formik.handleChange}></input>  
        </p>
        <p>
           <label htmlFor="Name">Employee Name : </label>
           <input type="text" name="Name" id="Name" value={formik.values.Name}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                  {formik.touched.Name && formik.errors.Name ? <span style={{color:'red'}}>{formik.errors.Name}</span> : null}
                  
         </p>
         <p>
           <label htmlFor="Location">Employee Location : </label>
           <input type="text" name="Location" id="Location" value={formik.values.Location}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                  {formik.touched.Location && formik.errors.Location ? <span style={{color:'red'}}>{formik.errors.Location}</span> : null}
                 
         </p>
         <p>
           <label htmlFor="Salary">Employee Salary : </label>
           <input type="text" name="Salary" id="Salary" value={formik.values.Salary}
                  onChange={formik.handleChange}></input>                  
         </p>
         <p>
           <label htmlFor="EmailId">Employee Email ID : </label>
           <input type="text" name="EmailId" id="EmailId" value={formik.values.EmailId}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                  {formik.touched.EmailId && formik.errors.EmailId ? <span style={{color:'red'}}>{formik.errors.EmailId}</span> : null}
                 
         </p>
         <button type="submit">Create</button>
  </form>
    </div> 
  )
};



export default Home;