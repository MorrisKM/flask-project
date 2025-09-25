import React from 'react'
import { Link } from "react-router"

const Homecards = () => {
  return (
    <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">For Attendees</h2>
              <p className="mt-2 mb-4">
                Browse various events that may be of interest to you 
              </p>
              <Link
                to="/"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Browse Events
              </Link>
            </div>
            <div className = 'bg-gray-100 p-6 rounded-lg shadow-md'>
              <h2 className="text-2xl font-bold">For Organizers</h2>
              <p className="mt-2 mb-4">
                List your upcoming event to find the perfect people for the event
              </p>
              <Link
                to="/events/add"
                className="inline-block bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-sky-600"
              >
                Add Event
              </Link>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Homecards