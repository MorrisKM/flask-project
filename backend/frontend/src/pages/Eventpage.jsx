import { useParams, useNavigate, Link} from 'react-router';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { toast } from 'sonner';
import { deleter } from '../hooks/useFetch';
import { useEffect, useState } from 'react';

const Eventpage = () => {
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


  const handleDelete = async (id) => {
    toast(`Delete: ${event.title}`, {
      action: {
        label: 'Yes',
        onClick: () => {
          toast.success('Event deleted successfully')
          setTimeout(() => {
            deleter(`/Events/events/${id}`);
            navigate('/')
          }, 500)
        }
      }
    })
  };


  
  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className='mr-2'/> Back to Event Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="flex w-full gap-6">
            <main className='w-7/10'>
              <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
              >
                <div className="text-gray-500 mb-4">{event.category}</div>
                <h1 className="text-3xl font-bold mb-4">
                  {event.title}
                </h1>
                <div
                  className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                  <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"/>
                  <p className="text-orange-700">Nakuru</p>
                </div>
                <h3 className="text-indigo-800 text-lg font-bold mb-2">Date: {event.event_date}</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Event Description
                </h3>

                <p className="mb-4">
                {event.description}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Ticket</h3>

                <p className="mb-4">ksh: {event.ticket_price}</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside className='w-3/10'>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Event</h3>
                <Link
                  to={`/events/${event.id}/edit`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >Edit Event</Link>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete Event
                </button>
                <button 
                  className="text-black font-bold py-2 px-4  w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Rsvp Count: NaN
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default Eventpage

