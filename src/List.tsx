import React from 'react';
import { useQuery } from 'react-query'

export
function List() {
  const { isLoading, error, data } = useQuery('jimao', async () => {
    const result = await fetch('https://api.github.com/repos/tannerlinsley/react-query');
    return result.json();
  });
  if (isLoading) return <span>加载中</span>;
  if (error) return <span>失败了</span>;
  return <div>
    <h1>{data.name}</h1>
    <p>{data.description}</p>
    <strong>👀 {data.subscribers_count}</strong>{' '}
    <strong>✨ {data.stargazers_count}</strong>{' '}
    <strong>🍴 {data.forks_count}</strong>
  </div>;
}
