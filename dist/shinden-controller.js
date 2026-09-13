(() => {
  // src/tasks/SequencedTask.js
  var SequencedTask = class {
    constructor(taskSequence, name) {
      this.taskSequence = taskSequence;
      this.name = name;
      this.length = this.taskSequence.length;
    }
    run(step) {
      this.save_task_state(step);
      console.log("Calling ", step + 1, " out of ", this.length);
      this.taskSequence[step]();
      if (step == this.length - 1) return null;
      else return step + 1;
    }
    save_task_state(step) {
      if (step == this.length) {
        localStorage.removeItem("pendingTask");
      }
      const data = { taskName: this.name, step };
      localStorage.setItem("pendingTask", JSON.stringify(data));
    }
  };

  // src/tasks/players.js
  var Player = Object.freeze({
    CDA: "Cda",
    GDRIVE: "Gdrive",
    MEGA: "Mega",
    VK: "Vk"
  });
  function run_players(player) {
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
  function play_gDrive() {
    console.log("Playing gDrive");
    test_iframe_access();
  }
  function play_cda() {
    console.log("Playing cda");
  }
  function play_vk() {
    console.log("Playing VK");
  }
  function play_mega() {
    console.log("Playing MEGA");
  }
  function test_iframe_access() {
    const iframe = document.querySelector("#player-block iframe");
    if (!iframe) {
      console.warn("No iframe found");
      return;
    }
    try {
      const doc = iframe.contentDocument;
      console.log("Got iframe document:", doc);
    } catch (e) {
      console.error("Blocked from accessing iframe content:", e);
    }
  }

  // src/tasks/next-episode.js
  var next_episode_name = "Next Episode";
  function click_next_episode() {
    console.log("Running click_next_episode");
    const next_episode_link = document.querySelector('a[title="Nast\u0119pny epizod"]');
    next_episode_link.click();
  }
  function run_episode() {
    const player = find_first_supported_player(get_available_players());
    click_player_button(player);
    setTimeout(() => {
      run_players(player);
    }, 15e3);
  }
  function get_available_players() {
    const buttons = document.querySelectorAll("a.change-video-player");
    const players = [];
    for (const button of buttons) {
      const dataEpisode = button.getAttribute("data-episode");
      if (!dataEpisode) continue;
      try {
        const episodeData = JSON.parse(dataEpisode);
        players.push(episodeData.player);
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
    const buttons = document.querySelectorAll("a.change-video-player");
    for (const button of buttons) {
      const dataEpisode = button.getAttribute("data-episode");
      if (!dataEpisode) continue;
      try {
        const episodeData = JSON.parse(dataEpisode);
        if (episodeData.player === playerName) {
          button.click();
          return true;
        }
      } catch (e) {
        console.warn("Failed to parse data-episode", e);
      }
    }
    console.warn(`No player button found for: ${playerName}`);
    return false;
  }
  var next_episode = new SequencedTask([click_next_episode, run_episode], next_episode_name);

  // src/services/EventHandler.js
  var EventHandler = class {
    constructor(taskController2) {
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      console.log("Event Listener initialized");
      this.taskController = taskController2;
    }
    handleKeyDown(event) {
      switch (event.code) {
        case "Digit0":
          console.log("Key Pressed");
          this.taskController.run_task(next_episode_name, 0);
          break;
      }
    }
  };

  // src/services/TaskController.js
  var TaskController = class {
    constructor() {
      this.tasks = {
        [next_episode.name]: next_episode
      };
      this.check_pending_tasks();
    }
    check_pending_tasks() {
      const raw = localStorage.getItem("pendingTask");
      if (raw) {
        const { taskName, step } = JSON.parse(raw);
        this.run_task(taskName, step);
      }
    }
    run_task(taskName, step) {
      while (step != null) {
        step = this.tasks[taskName].run(step);
      }
    }
  };

  // src/shinden-controller.js
  var SUPPORTED_PLAYERS = [Player.GDRIVE, Player.MEGA, Player.CDA];
  console.log("shinden-controller loaded!");
  taskController = new TaskController();
  handler = new EventHandler(taskController);
})();
