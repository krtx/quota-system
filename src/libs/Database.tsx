import firebase from 'firebase/app';
import 'firebase/firestore';
import { Task, TaskDefinition } from './Task';

class Database {
  db: any;

  constructor() {
    this.db = firebase.firestore();
    this.db.settings({timestampsInSnapshots: true});
  }

  addTask(task : TaskDefinition) {
    this.db.collection("tasks").add({
      description: task.description,
      quota: task.quota,
      range: task.range,
    });
  }

  deleteTask(id: string) {
    this.db.collection("tasks").doc(id).delete();
  }

  // Get all tasks with counts
  async getTasks() {
    let querySnapshot = await this.db.collection('tasks').get();

    let tasks: Task[] = [];
    for (let doc of querySnapshot.docs) {
      let data = doc.data();

      // get count
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
      let snap = await this.db.collection(`tasks/${doc.id}/done`).where("timestamp", ">", fromDate).get();

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

  incrementTaskCount(id: string) {
    this.db.collection('tasks').doc(id).collection('done').add({
      timestamp: new Date
    });
  }
}

export default Database;