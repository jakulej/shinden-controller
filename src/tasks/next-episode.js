import SequencedTask from "./SequencedTask"
const next_episode_name = "Next Episode"


function click_next_episode(){
    console.log("Running click_next_episode");
    const next_episode_link = document.querySelector('a[title="Następny epizod"]');
    next_episode_link.click();
}
function run_episode(){
    console.log("Running run_episode");
}


const next_episode = new SequencedTask([click_next_episode,run_episode], next_episode_name);
export {next_episode, next_episode_name}

