import { useState, useEffect } from 'react';

function useFetch(url) {
   const [data, setData] = useState();
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);


   async function fetchUrl() {

      try {
         const response = await fetch(url);
         const json = await response.json()
         setData(json);
      } catch (error) {
         setError(true);
         console.log('you have error', error)

      } finally {
         setLoading(false);
      }


   }

   useEffect(() => { fetchUrl() }, []);

   return [data, loading, error, setData];

}

export { useFetch };
