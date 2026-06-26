import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 
// Validation Schema using Yup
const signupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});
 
const DepartmentFormik = () => (
<Formik
    initialValues={{ username: '', email: '' }}
    validationSchema={signupSchema}
    onSubmit={(values, { setSubmitting }) => {
      console.log('Form Data:', values);
      setSubmitting(false);
    }}
>
    {({ isSubmitting }) => (
<Form>
<div>
<label htmlFor="username">Username</label>
<Field type="text" name="username" id="username" />
<ErrorMessage name="username" component="div" className="error" />
</div>
 
        <div>
<label htmlFor="email">Email</label>
<Field type="email" name="email" id="email" />
<ErrorMessage name="email" component="div" className="error" />
</div>
 
        <button type="submit" disabled={isSubmitting}>
          Submit
</button>
</Form>
    )}
</Formik>
);
 
export default DepartmentFormik;