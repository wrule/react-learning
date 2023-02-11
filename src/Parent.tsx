import { Button, Space } from 'antd';
import react, { useMemo, useState } from 'react';
import { Child } from './Child';
import UserInfoContext from './Context';

export
const Parent = () => {
  const [userInfo, setUserInfo] = useState({ name: 'jimao', age: 30 });

  console.log('父组件渲染');
  return <div>
    <p>父组件</p>
    <div>
      <Space>
        <Button onClick={() => {
          setUserInfo({
            ...userInfo,
            age: userInfo.age - 1,
          });
        }}>{userInfo.name}</Button>
        <span>{userInfo.age}</span>
      </Space>
    </div>
    <UserInfoContext.Provider value={[userInfo, setUserInfo]}>
      <Child />
    </UserInfoContext.Provider>
  </div>;
};
