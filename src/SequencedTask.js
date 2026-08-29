export default class SequencedTask {
    constructor(taskSequence, name) {
        this.taskSequence = taskSequence;
        this.name = name;
        this.lenght = this.taskSequence.lenght;
    }

    call(step) {
        console.log("Calling ",step, " out of ", this.lenght);
    }
}