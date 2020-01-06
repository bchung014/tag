import "./styles/index.scss";
import Game from './game';

window.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.initialize();
});