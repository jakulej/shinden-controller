
export const Player = Object.freeze({
    CDA: "Cda",
    GDRIVE: "Gdrive",
    MEGA: "Mega",
    VK: "Vk"
})

export default function run_players(player){
    switch (player) {
        case Player.VK:
            play_vk();
            break;
        
        case Player.CDA:
            play_cda();
            break;

        case Player.MEGA:
            play_mega();
            break;
        
        case Player.GDRIVE:
            play_gDrive();
            break;

        default:
            console.log("None of available players are supported");
    }
}


function play_gDrive(){
    console.log("Playing gDrive");
    test_iframe_access();
}

function play_cda(){
    console.log("Playing cda");
}

function play_vk(){
    console.log("Playing VK");
}
function play_mega(){
    console.log("Playing MEGA");
}

function test_iframe_access() {
    const iframe = document.querySelector('#player-block iframe');
    if (!iframe) {
        console.warn("No iframe found");
        return;
    }

    try {
        const doc = iframe.contentDocument; // or iframe.contentWindow.document
        console.log("Got iframe document:", doc);
    } catch (e) {
        console.error("Blocked from accessing iframe content:", e);
    }
}


export {play_cda, play_gDrive, play_vk, play_mega};