(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // src/tasks/SequencedTask.js
  var SequencedTask;
  var init_SequencedTask = __esm({
    "src/tasks/SequencedTask.js"() {
      SequencedTask = class {
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
    }
  });

  // src/tasks/next-episode.js
  function click_next_episode() {
    console.log("Running click_next_episode");
    const next_episode_link = document.querySelector('a[title="Nast\u0119pny epizod"]');
    next_episode_link.click();
  }
  function run_episode() {
    console.log("Running run_episode");
  }
  var next_episode_name, next_episode;
  var init_next_episode = __esm({
    "src/tasks/next-episode.js"() {
      init_SequencedTask();
      next_episode_name = "Next Episode";
      next_episode = new SequencedTask([click_next_episode, run_episode], next_episode_name);
    }
  });

  // src/services/EventHandler.js
  var EventHandler;
  var init_EventHandler = __esm({
    "src/services/EventHandler.js"() {
      init_next_episode();
      EventHandler = class {
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
    }
  });

  // src/services/TaskController.js
  var TaskController;
  var init_TaskController = __esm({
    "src/services/TaskController.js"() {
      init_next_episode();
      TaskController = class {
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
            console.log("Runing: ", taskName, ", Step: ", step);
            step = this.tasks[taskName].run(step);
            console.log("Step: ", step);
          }
        }
      };
    }
  });

  // src/shinden-controller.js
  var require_shinden_controller = __commonJS({
    "src/shinden-controller.js"() {
      init_EventHandler();
      init_TaskController();
      console.log("shinden-controller loaded!");
      taskController = new TaskController();
      handler = new EventHandler(taskController);
    }
  });
  require_shinden_controller();
})();
