import { useLocalStorage } from 'react-use';

const useAuthHeader = () => {
  const [token] = useLocalStorage('token');
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
};

export default useAuthHeader;
