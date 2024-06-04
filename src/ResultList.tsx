import React from 'react';

interface User {
  name: string;
  repos: number;
}

interface Repo {
  name: string;
  stars: number;
}

interface ResultListProps {
  data: User | Repo | null;
}

const ResultList: React.FC<ResultListProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  if ('name' in data && 'repos' in data) {
    return (
      <div>
        <h3>User</h3>
        <p>Name: {data.name}</p>
        <p>Repositories: {data.repos}</p>
      </div>
    );
  } else if ('name' in data && 'stars' in data) {
    return (
      <div>
        <h3>Repository</h3>
        <p>Name: {data.name}</p>
        <p>Stars: {data.stars}</p>
      </div>
    );
  }

  return null;
};

export default ResultList;