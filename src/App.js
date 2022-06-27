import React, { useState, useEffect } from 'react';

import useHttp from './hooks/useHttp';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const dataTransform = (dataTrns) => {
      const loadedTasks = [];
  
      for (const taskKey in dataTrns) {
        loadedTasks.push({ id: taskKey, text: dataTrns[taskKey].text });
      };

      setTasks(loadedTasks);
    };

    fetchTasks({ url: 'https://tasks-e8ae7-default-rtdb.firebaseio.com/tasks.json' },
      dataTransform)
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
};

export default App;
