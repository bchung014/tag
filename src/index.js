import "./styles/main.scss";
import Game from './game';

window.addEventListener("DOMContentLoaded", () => {
  const currGame = new Game();
  currGame.initialize();
});