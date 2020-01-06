import "./styles/index.scss";

window.addEventListener("DOMContentLoaded", () => {
  // const gameWindow = document.createElement("canvas");
  // gameWindow.innerHTML = '<h1>canvas</h1>'
  // document.body.append(gameWindow);


  document.body.classList.add("center");
  const card = document.createElement("div");
  card.classList.add("card", "center");
  card.innerHTML = `<h2> WAOJFWAOJFOWAJFWAOWorld!</h2>`;
  document.body.append(card);
});
