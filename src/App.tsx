import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { List1 } from './List1';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Space, Layout, Row, Col } from 'antd';
import { List2 } from './List2';
import { Parent } from './Parent';
import { Hooks } from './hooks';
 
const queryClient = new QueryClient();


type A = {
  a: string;
  b: boolean;
  c: number;
  d: () => void;
  e: (a: string) => void;
  f: (a: string, b: string) => void;
  g: (a: string, b: string, c: string) => void;
};

type B = {
  [
    Key in keyof A & string
    as A[Key] extends Function ? `useApi_${Key}` : never
  ]: A[Key];
};








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
        <Layout>
          <Layout.Header></Layout.Header>
          <Layout.Content style={{ padding: '20px' }}>
            <Row gutter={16}>
              <Hooks />
              {/* <Parent /> */}
              {/* <Col span={12}><List1 /></Col>
              <Col span={12}><List2 /></Col> */}
            </Row>
          </Layout.Content>
        </Layout>
        {/* <Space direction="horizontal">

        </Space> */}
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
