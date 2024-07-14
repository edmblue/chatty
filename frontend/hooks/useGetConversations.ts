'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConverations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const req = await fetch('http://localhost:5000/api/users', {
          credentials: 'include',
        });

        const res = await req.json();

        if (res.error) {
          throw new Error(res.error);
        }

        console.log(res);
        setConverations(res);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations, setConverations };
};

export default useGetConversations;
