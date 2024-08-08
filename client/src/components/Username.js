import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "35%",hight: "15%", paddingTop: '2em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-3 text-xl w-2/3 text-center text-white'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-3' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-6'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-5 py-2">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-8">
                <span className='text-white text-l'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
