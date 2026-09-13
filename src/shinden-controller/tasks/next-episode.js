import SequencedTask from "./SequencedTask"
import { SUPPORTED_PLAYERS } from "../shinden-controller"
import run_players from "./players"

const next_episode_name = "Next Episode"


function click_next_episode() {
    console.log("Running click_next_episode");
    const next_episode_link = document.querySelector('a[title="Następny epizod"]');
    next_episode_link.click();
}
function run_episode() {

    const player = find_first_supported_player(get_available_players());
    click_player_button(player);



    setTimeout(() => {
        run_players(player);
    }, 15000);
}


function get_available_players() {
    const buttons = document.querySelectorAll('a.change-video-player');
    const players = [];

    for (const button of buttons) {
        const dataEpisode = button.getAttribute('data-episode');
        if (!dataEpisode) continue;

        try {
            const episodeData = JSON.parse(dataEpisode);
            players.push(episodeData.player); // e.g. "Gdrive"
        } catch (e) {
            console.warn("Failed to parse data-episode", e);
        }
    }

    return players;
}


function find_first_supported_player(available) {

    for (const preferred of SUPPORTED_PLAYERS) {
        console.log("checking: ", preferred);
        if (available.includes(preferred)) {
            return preferred;
        }
    }

    return null;
}

function click_player_button(playerName) {
    const buttons = document.querySelectorAll('a.change-video-player');

    for (const button of buttons) {
        const dataEpisode = button.getAttribute('data-episode');
        if (!dataEpisode) continue;

        try {
            const episodeData = JSON.parse(dataEpisode);
            if (episodeData.player === playerName) {
                button.click();
                return true; // found and clicked
            }
        } catch (e) {
            console.warn("Failed to parse data-episode", e);
        }
    }

    console.warn(`No player button found for: ${playerName}`);
    return false;
}


const next_episode = new SequencedTask([click_next_episode, run_episode], next_episode_name);
export { next_episode, next_episode_name }

