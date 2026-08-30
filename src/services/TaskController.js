import { next_episode } from "../tasks/next-episode";

export default class TaskController {

    constructor() {
        this.tasks = {
            [next_episode.name] : next_episode,
        };
        this.check_pending_tasks()
    }

    check_pending_tasks() {
        const raw = localStorage.getItem("pendingTask");
        if (raw) {
            const { taskName, step } = JSON.parse(raw);
            this.run_task(taskName, step);
        }
    }


    run_task(taskName, step) {
        while (step!=null) {
            console.log("Runing: ",taskName,", Step: ",step)
            step = this.tasks[taskName].run(step)
            console.log("Step: ", step);
        }
    }

}