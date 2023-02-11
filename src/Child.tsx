import react, { useContext } from 'react';
import { UserInfoContext } from './Context';

export
const Child = () => {
  const user_info = useContext(UserInfoContext);
  console.log('子组件渲染');
  return <div>
    <p>子组件 <span>{user_info.age}</span></p>
  </div>;
};
