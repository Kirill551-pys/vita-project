import './App.css';

// ЗАДАЧА:
// Создать мини-приложение, где есть форма, в которой
// текстовый инпут и селект.
// Из селекта можно выбрать тип: "user" или "repo".
//
// В зависимости от того, что выбрано в селекте,
// при отправке формы приложение делает запрос
// на один из следующих эндпоинтов:
//
// https://api.github.com/users/${nickname}
// пример значений: defunkt, ktsn, jjenzz, ChALkeR, Haroenv
//
// https://api.github.com/repos/${repo}
// пример значений: nodejs/node, radix-ui/primitives, sveltejs/svelte
//
// после чего, в списке ниже выводится полученная информация;
// - если это юзер, то его full name и число репозиториев;
// - если это репозиторий, то его название и число звезд.

// ТРЕБОВАНИЯ К ВЫПОЛНЕНИЮ:
// - Типизация всех элементов.
// - Выполнение всего задания в одном файле App.tsx, НО с дроблением на компоненты.
// - Стилизовать или использовать UI-киты не нужно. В задаче важно правильно выстроить логику и смоделировать данные.
// - Задание требуется выполнить максимально правильным образом, как если бы вам нужно было, чтобы оно прошло код ревью и попало в продакшн.

// Все вопросы по заданию и результаты его выполнения присылать сюда - https://t.me/temamint

import React, { useState } from 'react';
import Form from './form';
import ResultList from './ResultList';

interface User {
  name: string;
  repos: number;
}

interface Repo {
  name: string;
  stars: number;
}
const App: React.FC = () => {
  const [data, setData] = useState<User | Repo | null>(null);

  const handleSubmit = async (type: 'user' | 'repo', value: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/${type}s/${value}` 
      );
      const data = await response.json();

      if (type === 'user') {
        setData({
          name: data.name,
          repos: data.public_repos,
        });
      } else {
        setData({
          name: data.name,
          stars: data.stargazers_count,
        });
      }
    } catch (error) {
      console.error(error);
      setData(null);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      <ResultList data={data} />
    </div>
  );
};

export default App;