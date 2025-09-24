import useFetch from '../hooks/useFetch';
import { ClipLoader } from 'react-spinners';
import VenueListing from './VenueListing';

const VenueListings = () => {
  const {data: venues, isPending, error} = useFetch('http://localhost:5005/Venue/venues')

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
          {venues && venues.map((venue) => (
            <VenueListing key={venue.id} venue={venue}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VenueListings