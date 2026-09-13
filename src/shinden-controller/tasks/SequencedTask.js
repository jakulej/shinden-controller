export default class SequencedTask {
    constructor(taskSequence, name) {
        this.taskSequence = taskSequence;
        this.name = name;
        this.length = this.taskSequence.length;
    }

    run(step) {
        this.save_task_state(step);
        console.log("Calling ",step + 1, " out of ", this.length);
        this.taskSequence[step]();

        if (step == this.length-1) return null;
        else return step + 1;
    }

    save_task_state(step){
        if (step == this.length){
            localStorage.removeItem("pendingTask");
        }

        const data = {taskName: this.name, step: step}
        localStorage.setItem("pendingTask", JSON.stringify(data));
    }
}