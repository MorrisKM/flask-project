import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router';


const Profile = () => {
  const {register, handleSubmit, reset,formState:{errors}} = useForm();
  const [user, setUser] = useState({})

  let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")

  useEffect(() => {
    let fectching = async () => {
      let fetched_data = await fetch("http://127.0.0.1:5005/User/profile",{
        method:"GET",
        headers: {
          'Authorization' : `Bearer ${JSON.parse(token)}`
        }
      })
      let data = await fetched_data.json()
      setUser(data)
    }
    fectching()
  }, [])
  console.log(user)

  const submitForm = (data) => {
    if(data.password === data.confirmPassword) {
      const body = {
        id: user.id,
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        category: data.category,
        last_name: data.last_name,
        phone_number: data.phone_number,
        age: data.age
      }
      const requestOptions={
        method:"PUT",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
      }

      fetch("http://127.0.0.1:5005/User/signup", requestOptions)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
      toast.success("User added succssfully")

    }else{
      toast.error("passwords do not match")
    }
    reset()
  }

  // console.log(watch("username"))

  return (
    <section className='bg-inidigo-50'>
      <div className='container m-auto max-w-2xl py-4'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0'>
          <form action="">
            <h2 className='text-center text-2xl'>Profile</h2>
            <label htmlFor="">Name:</label>
            <div className='mb-4 flex justify-between'>
              <div className='w-10/21'>
                <input 
                placeholder="First name"
                type="text" 
                name='first_name'
                defaultValue={user.first_name}
                {...register("first_name", {required:true, maxLength:20})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.first_name && <span className='text-red-600 text-sm'>First Name is required</span>}
                {errors.first_name?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
              </div>

              <div className='w-10/21'>
                <input 
                placeholder="Last name"
                defaultValue={user.last_name}
                type="text" 
                name='last_name'
                {...register("last_name", {required:true, maxLength:20})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.last_name && <span className='text-red-600 text-sm'>Last Name is required</span>}
                {errors.last_name?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
              </div>
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Email:</label>
              <input 
              placeholder='Enter Email'
              defaultValue={user.email}
              type="text" 
              name='email'
              {...register("email", {required:true, maxLength:40})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.email && <span className='text-red-600 text-sm'>Email is required</span>}
              {errors.email?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 40</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Phone Number:</label>
              <input 
              placeholder='Enter phone: 2547....'
              type="text" 
              defaultValue={user.phone_number}
              name='phone_number'
              {...register("phone_number", {required:true, maxLength:12})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.phone_number && <span className='text-red-600 text-sm'>Phone number is required</span>}
              {errors.phone_number?.type === "maxLength" && <span className='text-red-600 text-sm'>Max numbers is 12</span>}
            </div>

            <div className='mb-4 flex justify-between'>
              <div className='w-10/21'>
              <label htmlFor="">User Name:</label>
                <input 
                placeholder='User Name'
                defaultValue={user.username}
                type="text" 
                name='username'
                {...register("username", {required:true, maxLength:30})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.username && <span className='text-red-600 text-sm'>Username is required</span>}
                {errors.username?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 30</span>}
              </div>

              <div className='w-10/21'>
              <label htmlFor="">Age:</label>
                <input 
                placeholder='Age'
                type='number' 
                defaultValue={user.age}
                name='age'
                {...register("age", {required:true, maxLength:3})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.age && <span className='text-red-600 text-sm'>Age is required</span>}
                {errors.age?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 3</span>}
              </div>
            </div>



            <div className='mb-4 '>
              <label htmlFor="">Category:</label>
              <select
                id="type"
                name="category"
                defaultValue={user.category}
                className="border-b w-full py-2 px-3 outline-none"
                {...register("category", {required:true})}
              >
                <option value="organizer">Organizer</option>
                <option value="Attendee">Attendee</option>
              </select>
              {errors.category && <span className='text-red-600 text-sm'>Category is required</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Password:</label>
              <input 
              placeholder='Enter password'
              type="password" 
              defaultValue={user.password}
              name='password'
              {...register("password", {required:true, minLength:8})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.password && <span className='text-red-600 text-sm'>Password is required</span>}
              {errors.password?.type === "minLength" && <p className='text-red-600 text-sm'>Min characters is 8</p>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Password:</label>
              <input 
              placeholder='Confirm password'
              type="password" 
              name='password'
              {...register("confirmPassword", {required:true, minLength:8})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.confirmPassword && <span className='text-red-600 text-sm'>Password is required</span>}
              {errors.confirmPassword?.type === "minLength" && <p className='text-red-600 text-sm'>Min characters is 8</p>}
            </div>

             <div className='flex justify-between'>
              <button
                className="bg-rose-950 hover:bg-indigo-600 text-white font-bold py-3 px-4 w-10/21 focus:outline-none focus:shadow-outline"
                onClick={handleSubmit(submitForm)}
              >
                Sign Up
              </button>
              <NavLink to={"/login"}
              className="bg-rose-950 text-center hover:bg-indigo-600 text-white font-bold py-3 px-4 w-10/21 focus:outline-none focus:shadow-outline">Log In</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Profile