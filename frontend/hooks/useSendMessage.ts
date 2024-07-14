'use client';

import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useConversation from '@/zustand/useConversation';

interface sendMessageProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const useSendMessage = ({ message, setMessage }: sendMessageProps) => {
  const [loading, setLoading] = useState(false);

  const { selectedConversation } = useConversation();

  const sendMessage = async () => {
    const success = handleInputErrors(message);

    if (!success) return;

    try {
      setLoading(true);

      const req = await fetch(
        `http://localhost:5000/api/message/send/${selectedConversation?._id}`,
        {
          method: 'POST',
          body: JSON.stringify({ message }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      const res = await req.json();

      if (res.msg) {
        throw new Error(res.msg);
      }

      setMessage('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputErrors = (message: string) => {
    if (!message) {
      toast.error("Can't be empty");
      return false;
    }

    return true;
  };

  return { sendMessage, loading };
};

export default useSendMessage;
