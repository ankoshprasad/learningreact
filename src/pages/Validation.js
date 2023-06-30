import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from './request';
import { addData } from './request';
import '../App.css';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';


function Validation() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    const formik2 = useFormik({
        initialValues: {
            email: '',
            contact: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <>
        <div>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />

            

            <button type="submit">Submit</button>
        </form>
        </div>
        <div>
        <form onSubmit={formik2.handleSubmit}>
            <label htmlFor="email">Email id</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik2.handleChange}
                value={formik2.values.email}
            />

            <label htmlFor="contact">Contact</label>
            <input
                id="contact"
                name="contact"
                type="text"
                onChange={formik2.handleChange}
                value={formik2.values.contact}
            />

            

            <button type="submit">Submit</button>
        </form>
        </div>
        </>
    );
}

export default Validation;

