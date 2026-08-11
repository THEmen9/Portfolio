// src/hooks/useFetch.js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, [url]);

    return { data, isLoading, error };
}

export default useFetch;