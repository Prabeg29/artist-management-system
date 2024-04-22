import { roles } from '@enums/roles.enum';
import { User, UserInput } from '../user.type';

const userStub = (): User[] => {
  return [
    {
      id        : 1,
      first_name: 'Timi',
      last_name : 'Hemdrix',
      email     : 'voodoochild@gmail.com',
      phone     : '9800000000',
      dob       : new Date('2022-12-09 00:00:00'),
      gender    : 'male',
      address   : 'Seattle, US',
      role      : roles.ARTIST,
    }
  ];
};

const userInputStub = (): UserInput => {
  return {
    first_name: 'Timi',
    last_name : 'Hemdrix',
    email     : 'voodoochild@gmail.com',
    password  : 'P@ssword123$',
    phone     : '9800000000',
    dob       : new Date('2022-12-09 00:00:00'),
    gender    : 'male',
    address   : 'Seattle, US',
    role      : roles.ARTIST
  };
};

export { userStub, userInputStub };
