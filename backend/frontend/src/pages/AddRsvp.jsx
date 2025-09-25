import { toast } from 'sonner';
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router';


const AddRsvp = () => {
  const {register, handleSubmit, reset,formState:{errors}} = useForm();
  let {id} = useParams()
  let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
  

  const submitForm = (data) => {
    const body = {
      event_id: id,
      user_id: data.user_id,
      dietary_preference: data.dietary_preference,
      special_request: data.special_request,
      rsvp_status: data.rsvp_status
    }
    if (!token) {
      toast.error("No authentication token found")
      return;
    }
    const requestOptions={
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(body)
    }

    fetch("http://127.0.0.1:5005/rsvp/rsvps", requestOptions)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => toast.error(err.message || "something went wrong"))
    toast.success("Venue added successfully")

    reset()
    }
  return (
        <section className='bg-inidigo-50'>
      <div className='container m-auto max-w-2xl py-4'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0'>
          <form action="">
            <h2 className='text-center text-2xl'>Add RSVP:</h2>
            <div className='mb-4 flex mt-2 justify-between'>
              <div className='w-10/21'>
              <label htmlFor="">Event Id:</label>
                <input 
                placeholder='Event Id'
                type="text" 
                name='event_id'
                disabled
                value={id}
                className='border-b w-full py-2 px-3 mb-2'/>
              </div>

              <div className='w-10/21'>
                <label htmlFor="">User Id:</label>
                <input 
                placeholder='Enter User Id'
                type="number" 
                name='user_id'
                {...register("user_id", {required:true, maxLength:5})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.user_id && <span className='text-red-600 text-sm'>User Id is required</span>}
                {errors.user_id?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 5</span>}
              </div>
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Dietary Preference:</label>
              <input 
              placeholder='Enter Dietary Preference'
              type="text" 
              name='dietary_preference'
              {...register("dietary_preference", {required:true, maxLength:200})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.dietary_preference && <span className='text-red-600 text-sm'>Dietary Preference is required</span>}
              {errors.dietary_preference?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 200</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Special Request:</label>
              <input 
              placeholder='Enter Special Request'
              type="text" 
              name='special_request'
              {...register("special_request", {required:true, maxLength:200})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.special_request && <span className='text-red-600 text-sm'>Special Request is required</span>}
              {errors.special_request?.type === "maxLength" && <span className='text-red-600 text-sm'>Max caharcter is 200</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Rsvp Status:</label>
              <select
                id="type"
                name="rsvp_status"
                className="border-b w-full py-2 px-3 outline-none"
                {...register("rsvp_status", {required:true})}
              >
                <option value="organizer">Pending</option>
                <option value="Attendee">Approved</option>
              </select>
              {errors.rsvp_status && <span className='text-red-600 text-sm'>Rsvp Status is required</span>}
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

export default AddRsvp