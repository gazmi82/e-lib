import { User } from '../../interfaces/users';

const userRoleDataTransformer = (data: User) => {
  return {
    aprovuar: data.aprovuar,
    roli: data.roli,
    tipPerdorues: data.tipPerdorues,
  };
};

export default userRoleDataTransformer;
