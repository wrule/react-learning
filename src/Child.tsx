import react, { useContext } from 'react';
import UserInfoContext from './Context';

export
const Child = () => {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  console.log('子组件渲染');
  return <div>
    <p>{userInfo.name} <span onClick={() => {
      setUserInfo({
        ...userInfo,
        age: userInfo.age + 1,
      });
    }}>{userInfo.age}</span></p>
  </div>;
};
