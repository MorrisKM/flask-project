import {useEffect, useState} from 'react'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form'


const EditVenue = () => {
  const {register, handleSubmit, reset,formState:{errors}} = useForm();
  let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

    const [venue, setVenue] = useState({})
    const navigate = useNavigate();
    const {id} = useParams();
      
    useEffect(()=> {
      const dataLoader = async() => {
        const res = await fetch(`http://localhost:5005/Venue/venues/${id}`);
        const data = await res.json();
        setVenue(data) 
      }
      dataLoader()
    }, [])

  const submitForm = (data) => {
    const body = {
      id: id,
      venue_name: data.venue_name,
      owner_name: data.owner_name,
      owner_email: data.owner_email,
      location: data.location,
      picture: data.picture,
      capacity: data.capacity,
    }
    if (!token) {
      toast.error("No authentication token found")
      return;
    }
    const requestOptions={
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(body)
    }

    fetch("http://127.0.0.1:5005/Venue/venues", requestOptions)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => toast.error(err.message || "something went wrong"))
    toast.success("Venue edited successfully")

    reset()
    navigate("/venues")
  }

  // console.log(watch("username"))

  return (
    <section className='bg-inidigo-50'>
      <div className='container m-auto max-w-2xl py-4'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0'>
          <form action="">
            <h2 className='text-center text-2xl'>Add Venue:</h2>
            <div className='mb-4 flex mt-2 justify-between'>
              <div className='w-10/21'>
              <label htmlFor="">Venue Name:</label>
                <input 
                placeholder='Venue Name'
                type="text" 
                defaultValue={venue.venue_name}
                name='venue_name'
                {...register("venue_name", {required:true, maxLength:20})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.venue_name && <span className='text-red-600 text-sm'>Venue Name is required</span>}
                {errors.venue_name?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
              </div>

              <div className='w-10/21'>
                <label htmlFor="">Capacity:</label>
                <input 
                placeholder='Capacity'
                type="number" 
                defaultValue={venue.capacity}
                name='capacity'
                {...register("capacity", {required:true, maxLength:20})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.capacity && <span className='text-red-600 text-sm'>Capacity is required</span>}
                {errors.capacity?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
              </div>
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Owner Name:</label>
              <input 
              placeholder='Enter Owner Name'
              type="text" 
              defaultValue={venue.owner_name}
              name='owner_name'
              {...register("owner_name", {required:true, maxLength:40})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.owner_name && <span className='text-red-600 text-sm'>Owner Name is required</span>}
              {errors.owner_name?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 40</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Owner Email:</label>
              <input 
              placeholder='Enter Owner Email'
              type="text" 
              defaultValue={venue.owner_email}
              name='owner_email'
              {...register("owner_email", {required:true, maxLength:30})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.owner_email && <span className='text-red-600 text-sm'>Owner Email is required</span>}
              {errors.owner_email?.type === "maxLength" && <span className='text-red-600 text-sm'>Max numbers is 12</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Location:</label>
                <input 
                placeholder='Location'
                type="text" 
                defaultValue={venue.location}
                name='location'
                {...register("location", {required:true, maxLength:30})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.location && <span className='text-red-600 text-sm'>Location is required</span>}
                {errors.location?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 30</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Picture Url:</label>
                <input 
                placeholder='Picture url'
                type="text" 
                defaultValue={venue.picture}
                name='picture'
                {...register("picture", {required:true, maxLength:30})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.picture && <span className='text-red-600 text-sm'>Picture url is required</span>}
                {errors.picture?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 30</span>}
            </div>

             <div className='flex justify-between'>
              <button
                className="bg-rose-950 hover:bg-indigo-600 text-white font-bold py-3 px-4 w-full focus:outline-none focus:shadow-outline"
                onClick={handleSubmit(submitForm)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditVenue