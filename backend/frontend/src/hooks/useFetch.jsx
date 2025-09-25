import {useState, useEffect} from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortCont = new AbortController();
    let db = async() => {
      try{
        let res = await fetch(url, {signal: abortCont.signal})
        if(!res.ok){
          throw new Error('could not fetch the data')
        }
        let dbData = await res.json();
        setData(dbData);
        setIsPending(false);
        setError(null)
      }catch(error) {
        if(error.name === 'AbortError') {
          console.log('fetch aborted')
        }else{
          setIsPending(false)
          setError(error.message)
        }
      }
    }
    db();

    return () => abortCont.abort()
  }, [url])


  return{data, isPending, error}
}
export default useFetch

const deleter = async (url) => {
  const res = await fetch(url, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete');
  }
  return true; // deletion succeeded
};

//updating 
const updater = async (url, obj) => {
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(obj)
  });
}


export { deleter, updater };


//data loader
const dataLoader = async({params}) => {
  const res = await fetch(`/Events/events/${params.id}`);
  const data = await res.json();
  return data
}
export{dataLoader} 