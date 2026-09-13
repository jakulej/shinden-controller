import { next_episode_name } from "../tasks/next-episode";


export default class EventHandler {
    constructor(taskController){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        console.log("Event Listener initialized");
        this.taskController = taskController;
    }

    handleKeyDown(event) {
        switch (event.code) {
            case "Digit0":
                console.log("Key Pressed")
                this.taskController.run_task(next_episode_name,0);
                break;
        }

    }
}