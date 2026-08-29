

export default class EventHandler {
    constructor(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this))
        console.log("Event Listener initialized")
    }

    handleKeyDown(event) {
        switch (event.code) {
            case "Digit0":
                console.log("Clicked button")
                break;
        }

    }
}