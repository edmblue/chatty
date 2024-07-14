'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '@/zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const req = await fetch(
          `http://localhost:5000/api/message/${selectedConversation?._id}`,
          {
            credentials: 'include',
          }
        );

        const res = await req.json();

        if (res.error) {
          throw new Error(res.error);
        }

        setMessages(res);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation]);

  return { loading, messages };
};

export default useGetMessages;
