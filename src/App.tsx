import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { List } from './List';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
const queryClient = new QueryClient();

function App() {
  const update = async () => {
    // const rsp = await axios.post('/api/xsea/workspace/page', {
    //   pageNum: 1,
    //   pageSize: 10,
    // });
    // console.log(rsp);
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div className="App">
     <QueryClientProvider client={queryClient}>
       <List />
     </QueryClientProvider>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
