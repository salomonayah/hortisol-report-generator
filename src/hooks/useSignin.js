import { useMutation } from 'react-query';
import { Login } from '../api';
import { useAppContext } from '../state';

export default function useSignin() {
  const { setUser } = useAppContext()
  const { isLoading, mutate, isError  } = useMutation(Login, {
    onSuccess: (data) => {
      setUser(data)
    }
  });

  return {
    isError,
    isLoading,
    login: mutate,
  };
}