import React from 'react'
import useFetch from '../hooks/useFetch';
import { ClipLoader } from 'react-spinners';
import EventListing from './EventListing';

const EventListings = () => {
  const {data: events, isPending, error} = useFetch('/Events/events')

  //cliploader stylings
  const override = {
    display: 'block',
    margin: '100px auto'
  }
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {isPending && <ClipLoader size={150} cssOverride={override} color='#232323' />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/*<!-- Job Listings map -->*/}
          {events && events.map((event) => (
            <EventListing key={event.id} event={event}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventListings