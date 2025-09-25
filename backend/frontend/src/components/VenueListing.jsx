import { useState } from 'react';
import {FaMapMarker} from 'react-icons/fa'
import { Link } from "react-router";

const VenueListing = ({venue}) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{venue.owner_email}</div>
          <h3 className="text-xl font-bold">{venue.venue_name}</h3>
        </div>

        <div className="mb-5">Capacity: {venue.capacity} people</div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="inline text-lg mb-1 mr-1"/>
            {venue.location}
          </div>
          <Link
            to={`/venues/${venue.id}`}
            className="h-[36px] bg-sky-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
          Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VenueListing