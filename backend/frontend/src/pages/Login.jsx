import React from 'react'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form'
import { login } from '../auth';
import { Navigate, NavLink } from 'react-router';

const Login = () => {
  const {register, handleSubmit, reset,formState:{errors}} = useForm();

  
    const submitForm = (data) => {
      const body = {
        username: data.username,
        password: data.password
      }
      const requestOptions={
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch("http://127.0.0.1:5005/User/login", requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data.access_token)
        login(data.access_token)

      })
      .catch(err => console.log(err))

      toast.success("User logged successfully")
  
      reset()
    }
  
    // console.log(watch("username"))
  
    return (
      <section className='bg-inidigo-50'>
        <div className='container m-auto max-w-xl py-10'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0'>
            <form action="">
              <h2 className='text-center text-2xl'>Log In</h2>

              <div className='mb-4'>
              <label htmlFor="">User Name:</label>
                <input 
                placeholder='User Name'
                type="text" 
                name='username'
                {...register("username", {required:true, maxLength:30})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.username && <span className='text-red-600 text-sm'>Username is required</span>}
                {errors.username?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 30</span>}
              </div>
  
              <div className='mb-4 '>
                <label htmlFor="">Password:</label>
                <input 
                placeholder='Enter password'
                type="password" 
                name='password'
                {...register("password", {required:true, minLength:8})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.password && <span className='text-red-600 text-sm'>Password is required</span>}
                {errors.password?.type === "minLength" && <p className='text-red-600 text-sm'>Min characters is 8</p>}
              </div>
  
               <div className='flex justify-between'>
                
                <button
                  className="bg-rose-950 hover:bg-indigo-600 text-white font-bold py-3 px-4 w-10/21 focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit(submitForm)}
                >
                  Log In
                </button>
                <NavLink to={"/signup"}
                className="bg-rose-950 text-center hover:bg-indigo-600 text-white font-bold py-3 px-4 w-10/21 focus:outline-none focus:shadow-outline">Sign Up</NavLink>
                
              </div>
            </form>
          </div>
        </div>
      </section>
    )
}

export default Login