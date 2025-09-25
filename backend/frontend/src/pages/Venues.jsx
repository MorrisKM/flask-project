import React from 'react'
import { Link } from 'react-router'
import VenueListings from '../components/VenueListings'

const Venues = () => {
  return (
    <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="flex justify-center p-4 rounded-lg">
            <div className = ' bg-gray-100 w-4/10 p-6 rounded-lg shadow-md'>
              <p className="mt-2 mb-4">
                Add new venue for events
              </p>
              <Link
                to="/venues/add"
                className="inline-block bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-sky-600"
              >
                Add Venue
              </Link>
            </div>
          </div>
          <section className="bg-blue-50 px-4 py-6">
            <VenueListings />
          </section>
        </div>
    </section>
  )
}

export default Venues