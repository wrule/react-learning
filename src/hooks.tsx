import { Button } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';

export
function Hooks() {
  const [num, setNum] = useState<number>(3);
  const anum = useMemo(() => num * 2, [num]);

  const func = useCallback(() => {
    console.log(num);
    return num + 11;
  }, [num]);

  const click = () => {
    func();
    func();
    func();
    func();
    func();
  };

  return <div>
    <p>{num}</p>
    <p>{anum}</p>
    <p>
      <Button onClick={click}>点我</Button>
    </p>
  </div>;
}
