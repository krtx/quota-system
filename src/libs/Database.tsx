import firebase from 'firebase/app';
import 'firebase/firestore';
import { Task, TaskDefinition } from './Task';

class Database {
  db: any;

  constructor() {
    this.db = firebase.firestore();
    this.db.settings({timestampsInSnapshots: true});
  }

  addUser(user: firebase.User) {
    this.db.collection("users").doc(user.uid).set({
      email: user.email
    });
  }

  addTask(userId: string, task: TaskDefinition) {
    this.db.collection(`users/${userId}/tasks`).add({
      description: task.description,
      quota: task.quota,
      range: task.range,
    });
  }

  deleteTask(userId: string, taskId: string) {
    this.db.collection(`users/${userId}/tasks`).doc(taskId).delete();
  }

  // Get all tasks with counts
  async getTasks(userId: string) {
    let querySnapshot = await this.db.collection(`users/${userId}/tasks`).get();

    let tasks: Task[] = [];
    for (let doc of querySnapshot.docs) {
      let data = doc.data();

      // calculate done count
      let fromDate;
      let currentDate = new Date;
      switch (data.range) {
        case "yearly":
          fromDate = new Date(currentDate.getFullYear(), 0, 1);
          break;
        case "monthly":
          fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          break;
        case "weekly":
          let day = currentDate.getDay() === 0 ? 6 : currentDate.getDay(); // 0 represents Monday
          fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          fromDate.setDate(fromDate.getDate() - day);
          break;
        case "daily":
          fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          break;
      }
      let snap = await this.db.collection(`users/${userId}/tasks/${doc.id}/done`).where("timestamp", ">", fromDate).get();

      let task = {
        id: doc.id,
        count: snap.size,
        definition: {
          description: data.description,
          quota: data.quota,
          range: data.range,
        }
      };

      tasks.push(task);
    }

    return tasks;
  }

  incrementTaskCount(userId: string, taskId: string) {
    this.db.collection(`users/${userId}/tasks/${taskId}/done`).add({
      timestamp: new Date
    });
  }
}

export default Database;