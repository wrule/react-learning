import { Button, Space } from 'antd';
import react, { useMemo, useState } from 'react';
import { Child } from './Child';
import { UserInfoContext } from './Context';

export
const Parent = () => {
  const [num, set_num] = useState<number>(0);

  const numb = useMemo(() => num * 2, [num]);

  console.log('父组件渲染');
  return <div>
    <p>父组件</p>
    <div>
      <Space>
        <Button onClick={() => {
          set_num(num + 1);
        }}>点我</Button>
        <span>{numb}</span>
      </Space>
    </div>
    <UserInfoContext.Provider value={{
      id: '1',
      name: 'jimao',
      sex: '男',
      age: num,
    }}>
      <Child />
    </UserInfoContext.Provider>
  </div>;
};
