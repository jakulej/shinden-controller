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

  // src/services/EventHandler.js
  var EventHandler;
  var init_EventHandler = __esm({
    "src/services/EventHandler.js"() {
      EventHandler = class {
        constructor() {
          document.addEventListener("keydown", this.handleKeyDown.bind(this));
          console.log("Event Listener initialized");
        }
        handleKeyDown(event) {
          switch (event.code) {
            case "Digit0":
              console.log("Clicked button");
              break;
          }
        }
      };
    }
  });

  // src/shinden-controller.js
  var require_shinden_controller = __commonJS({
    "src/shinden-controller.js"() {
      init_EventHandler();
      console.log("shinden-controller loaded!");
      handler = new EventHandler();
    }
  });
  require_shinden_controller();
})();
