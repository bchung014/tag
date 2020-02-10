import "./styles/main.scss";
import Launcher from './launcher';

window.addEventListener("DOMContentLoaded", () => {
  const gameLauncher = new Launcher();
  gameLauncher.start();
});