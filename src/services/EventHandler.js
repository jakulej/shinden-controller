import { nextEpisode } from "../actions/next-episode";

export default class EventHandler {
    constructor(){
        document.addEventListener("keydown", this.handleKeyDown(this))
    }

    handleKeyDown(event) {
        switch (event.code) {
            case "Digit0":
                nextEpisode();
                break;
        }

    }
}