import TaskCard from './TaskCard';
import NewTaskCard from './NewTaskCard';
import React, { Component } from 'react';
import Database from '../libs/Database';
import { Task } from '../libs/Task';

interface Props { }
interface State {
  tasks: Task[]
}

class TaskCardList extends  Component<Props, State> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      tasks: []
    }
  }

  loadTasks() {
    let db = new Database;
    db.getTasks().then((tasks) => this.setState({tasks: tasks}));
  }

  deleteTask(id: string) {
    if (!confirm('delete?')) {
      return;
    }

    // delete task
    let db = new Database;
    db.deleteTask(id);

    // reload tasks
    this.loadTasks();
  }

  incrementTaskCount(id: string) {
    // increment task count
    let db = new Database;
    db.incrementTaskCount(id);

    // reload tasks
    this.loadTasks();
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    let tasks = this.state.tasks.map((task) => {
      let deleteHandler = (() => {
        this.deleteTask(task.id);
      }).bind(this);

      let incrementCountHandler = (() => {
        this.incrementTaskCount(task.id);
      }).bind(this);

      return (
        <TaskCard
          key={task.id}
          description={task.definition.description}
          range={task.definition.range}
          quota={task.definition.quota}
          count={task.count}
          deleteHandler={deleteHandler}
          incrementCountHandler={incrementCountHandler}
        />
      )
    })

    return (
      <div>
        {tasks}
        <NewTaskCard refreshTasks={this.loadTasks.bind(this)}/>
      </div>
    );
  }
}

export default TaskCardList;