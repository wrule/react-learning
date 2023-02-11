import react from 'react';

export
interface UserInfo {
  id: string;
  name: string;
  sex: string;
  age: number;
  remark?: string;
}

export
const UserInfoContext = react.createContext<UserInfo>({
  id: '',
  name: '',
  sex: '男',
  age: 30,
});
