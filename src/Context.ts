import react, { useContext } from 'react';

function CreateContext<T>(defaultValue: T) {
  const tuple = [defaultValue, (value: T) => { }] as [T, (value: T) => void];
  return react.createContext(tuple);
}

const context = CreateContext({
  id: '',
  name: '',
  sex: '男',
  age: 30,
});

const [a, b] = useContext(context);
b()
