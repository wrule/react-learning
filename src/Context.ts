import react from 'react';

function CreateContext<T>(defaultValue: T) {
  const tuple = [defaultValue, (value: T) => { }] as [T, (value: T) => void];
  return react.createContext(tuple);
}

export default CreateContext({ name: 'jimao', age: 30 });
