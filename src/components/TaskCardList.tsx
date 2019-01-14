import TaskCard from './TaskCard';
import NewTaskCard from './NewTaskCard';
import React, { Component } from 'react';
import Database from '../libs/Database';
import { Task, TaskDefinition } from '../libs/Task';

interface Props {
  user: firebase.User;
}

interface State {
  tasks: Task[]
}

class TaskCardList extends  Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      tasks: []
    }
  }

  loadTasks() {
    let db = new Database;
    db.getTasks(this.props.user.uid).then((tasks) => this.setState({tasks: tasks}));
  }

  addTask(task: TaskDefinition) {
    // add new task
    let db = new Database;
    db.addTask(this.props.user.uid, task);

    // reload tasks
    this.loadTasks();
  }

  deleteTask(taskId: string) {
    if (!confirm('delete?')) {
      return;
    }

    // delete task
    let db = new Database;
    db.deleteTask(this.props.user.uid, taskId);

    // reload tasks
    this.loadTasks();
  }

  incrementTaskCount(taskId: string) {
    // increment task count
    let db = new Database;
    db.incrementTaskCount(this.props.user.uid, taskId);

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
        <NewTaskCard addTask={this.addTask.bind(this)} />
      </div>
    );
  }
}

export default TaskCardList;