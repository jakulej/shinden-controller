import EventHandler from "./services/EventHandler";
import TaskController from "./services/TaskController";

console.log('shinden-controller loaded!');

taskController = new TaskController(); 
handler = new EventHandler(taskController);
