import { Button, Space } from 'antd';
import react, { useMemo, useState } from 'react';
import { Child } from './Child';

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
    <Child />
  </div>;
};
