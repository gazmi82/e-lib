import jwt_decode from 'jwt-decode';

export const getUserRole = () => {
  const token = localStorage.getItem('idToken');
  if (token) {
    const decoded: any = token && jwt_decode(token);
    return decoded.role[0];
  }
};
export const getUserName = () => {
  const token = localStorage.getItem('idToken');
  if (token) {
    const decoded: any = token && jwt_decode(token);
    return decoded.sub;
  }
};
