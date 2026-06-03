import "./styles.css";
import { initializeApp } from "./modules/appController.js";
import { render, initDOMEvents } from "./modules/domController.js";

initializeApp();
initDOMEvents();
render();
