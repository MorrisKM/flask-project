import {useState, useEffect} from 'react'
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form'

const EditEvent = () => {
  const {register, handleSubmit, reset,formState:{errors}} = useForm();
  let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

  const [event, setEvent] = useState({})
  const navigate = useNavigate();
  const {id} = useParams();
    
  
    useEffect(()=> {
      const dataLoader = async() => {
        const res = await fetch(`/Events/events/${id}`);
        const data = await res.json();
        setEvent(data) 
      }
      dataLoader()
    }, [])

  const submitForm = (data) => {
    const body = {
      id: id,
      title: data.title,
      description: data.description,
      event_date: data.event_date,
      ticket_price: data.ticket_price,
      picture: data.picture,
      category: data.category,
      venue_id: data.venue_id,
      organizer_id: data.organizer_id
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

    fetch("/Events/events", requestOptions)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => toast.error(err.message || "something went wrong"))
    toast.success("Event edited successfully")

    reset()
    navigate("/")
  }
  return (
    <section className='bg-inidigo-50'>
      <div className='container m-auto max-w-2xl py-4'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0'>
          <form action="">
            <h2 className='text-center text-2xl'>Edit Event:</h2>
            <div className='mb-4'>
            <label htmlFor="">Title:</label>
              <input 
              placeholder='Title'
              defaultValue={event.title}
              type="text" 
              name='title'
              {...register("title", {required:true, maxLength:20})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.title && <span className='text-red-600 text-sm'>Title is required</span>}
              {errors.title?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
            </div>

            <div className='mb-4'>
              <label htmlFor="">Description:</label>
              <input 
              placeholder='Description'
              type="text" 
              defaultValue={event.description}
              name='description'
              {...register("description", {required:true, maxLength:400})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.description && <span className='text-red-600 text-sm'>Description is required</span>}
              {errors.description?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 400</span>}
            </div>


            <div className='mb-4 '>
              <label htmlFor="">Event Date:</label>
              <input 
              placeholder='Enter Event Date'
              type="date" 
              name='event_date'
              {...register("event_date", {required:true})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.event_date && <span className='text-red-600 text-sm'>Event Date is required</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Ticket Price:</label>
              <input 
              placeholder='Enter Ticket Price'
              type="number" 
              defaultValue={event.ticket_price}
              name='ticket_price'
              {...register("ticket_price", {required:true, maxLength:5})}
              className='border-b w-full py-2 px-3 mb-2'/>
              {errors.ticket_price && <span className='text-red-600 text-sm'>Ticket Price is required</span>}
              {errors.ticket_price?.type === "maxLength" && <span className='text-red-600 text-sm'>Max numbers is 5</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Picture Url:</label>
                <input 
                placeholder='Picture url'
                type="text" 
                defaultValue={event.picture}
                name='picture'
                {...register("picture", {required:true, maxLength:30})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.picture && <span className='text-red-600 text-sm'>Picture url is required</span>}
                {errors.picture?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 30</span>}
            </div>

            <div className='mb-4 '>
              <label htmlFor="">Category:</label>
                <input 
                placeholder='Category'
                type="text" 
                defaultValue={event.category}
                name='category'
                {...register("category", {required:true, maxLength:30})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.category && <span className='text-red-600 text-sm'>Category is required</span>}
                {errors.category?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 30</span>}
            </div>
            <div className='mb-4 flex mt-2 justify-between'>
              <div className='w-10/21'>
              <label htmlFor="">Venue id:</label>
                <input 
                placeholder='Venue id (Venue is registered on the platform)'
                type="number" 
                defaultValue={event.venue_id}
                name='venue_id'
                {...register("venue_id", {required:true, maxLength:20})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.venue_id && <span className='text-red-600 text-sm'>Venue id is required</span>}
                {errors.venue_id?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
              </div>

              <div className='w-10/21'>
                <label htmlFor="">Organizer id:</label>
                <input 
                placeholder='Organizer id (Organizer is a registered user'
                type="number" 
                defaultValue={event.organizer_id}
                name='organizer_id'
                {...register("organizer_id", {required:true, maxLength:20})}
                className='border-b w-full py-2 px-3 mb-2'/>
                {errors.organizer_id && <span className='text-red-600 text-sm'>Organizer_id is required</span>}
                {errors.organizer_id?.type === "maxLength" && <span className='text-red-600 text-sm'>Max characters is 20</span>}
              </div>
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

export default EditEvent