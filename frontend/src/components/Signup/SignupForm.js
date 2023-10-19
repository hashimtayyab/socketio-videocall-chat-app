import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Formik, Field } from 'formik';
import { signupSchema } from './SignupSchema';
import axios from 'axios';
import './SignupForm.css';
import { PersistFormikValues } from 'formik-persist-values';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const initialValues={
  username: "",
  email: "",
  phone:"",
  gender: "",
  password: "",
  confirm_password:"",
};


function FormValidation() {  
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
      <Col>
      <Card style={{paddingLeft: '20px'}}>
    <Formik
    initialValues= {initialValues}
    validationSchema= {signupSchema}
    
    
    onSubmit = { (values) =>{
      axios.post('http://localhost:4000/user', {
        email: values.email,
        username: values.username,
        password: values.password,
        phone: values.phone,
        gender: values.picked,
      }).then((res) => {localStorage.setItem('email', values.email)});
      navigate('/verify-user')
    }}>

    
{({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
     <form onSubmit={handleSubmit}>
      <h4>Register Form</h4>
     <div className='name-block'>
          <label htmlFor="username">Name:</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='username'
              id='username'
              placeholder='Name' 
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {errors.name && touched.name ? (<p className='form-error'>{errors.name}</p>):null}
      </div>
      <div className='email-block'>
          <label htmlFor='email'>Email:</label>
          <br />
          <input type='email'
              autoComplete='off'
              name='email'
              id='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
               />
              {errors.email && touched.email ? (<p className='form-error'>{errors.email}</p>):null}
      </div>
        <div className='phone-block'>
          <label htmlFor='phone'>Phone no.</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='phone'
              id='phone'
              placeholder='03XX-XXXXXXX'
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {/* {errors.phone && touched.phone ?
            (<p className='form-error'>{errors.phone}</p>):null} */}
        </div>


        <div className='gender-block' >
          <div id="my-radio-group">Select Gender:</div>
          <div style={{marginLeft: '-180px'}} role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="picked" value="male" />
              Male
            </label>
            <label>
              <Field type="radio" name="picked" value="female" />
              Female
            </label>
            {/* <div>Picked: {values.picked}</div> */}
          </div>
            {errors.gender && touched.gender ?
            (<p className='form-error'>{errors.gender}</p>):null}
        </div>
        <div className='password-block'>
          <label htmlFor='password'>Password:</label>
          <br />
          <input type='password'
              autoComplete='off'
              name='password'
              id='password'
              placeholder='Password' 
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              />
            {errors.password && touched.password ? (<p className='form-error'>{errors.password}</p>):null}

      </div>
      <div className='confirm-block'>
          <label htmlFor='confirm_password'>Confirm Password:</label>
          <br />
          <input type='password'
              autoComplete='off'
              name='confirm_password'
              id='confirm_password'
              placeholder='Confirm Password'
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>

        <div>
            {/* <br /> */}
          <Button variant='outline-success' type='submit' style={{marginTop: '20px'}}>Register</Button>
      </div>
      <PersistFormikValues name="signup-form" />
     </form>
    )}
    </Formik>
    </Card>
    </Col>
    <Col></Col>
    </Row>
    </Container>
  );
};

export default FormValidation;