import EventHandler from "./services/EventHandler";
import TaskController from "./services/TaskController";
import { Player } from "./tasks/players";

export const SUPPORTED_PLAYERS = [Player.GDRIVE, Player.MEGA, Player.CDA];


console.log('shinden-controller loaded!');

taskController = new TaskController(); 
handler = new EventHandler(taskController);
