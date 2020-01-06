# Tag (working title)
Tag is a 2D platform game that allows players to run around and tag each other.
If the "IT" player has not tagged another player within a certain time limit, the game is over.

## Background and Overview
Tag is an exciting, quick-play game that allows players to either play with a whole party of friends,
or challenge one another to 1v1 tag duels.

Games will be played on a small 2D map with various features ranging from platforms to obstacles.
At the beginning of each game, a random player will be selected to be "IT" and a countdown begins.
If the "IT" player fails to tag another player before the countdown reaches 0, the game is over.

## Functionality and MVPs
1. 2 players can spawn locally on a map and move around simulatenously
2. The players can traverse the map and its various obstacles
3. Players can tag one another and a win condition can be met
4. A score will be held to determine which player is in the lead
6. A production README

## Wireframes
This game will initally consist of a single map with two players immediately spawning in. Upon
spawning, one of the two players will be deemed "IT" indicated by a banner above one of the
players' models. Players will then have to traverse across the map and try to tag each other.
There will also be a timer at the top of the screen to tell users how much longer the current
tagger has before the game is over. Beside the timer, there will be a score representing each
player's current number of wins.

![Wireframe](./src/assets/wireframe.png)

## Architecture and Technology

Tag will be built with:
JavaScript for creating the game logic.
HTML & CSS for visualizing the game components.
Webpack & Babel to bundle the JS files.

## Implementation Timeline
### Day 1
Create project skeleton, install all necessary node modules, get Webpack running, get a basic entry file, make a base visual component, make a directory of game logic files, etc.

### Day 2
Start working through game logic and building out how the tagging mechanics work.

### Day 3
Begin creating a a visual representation of the game into the web browser.

### Day 4
Continue with the visual aspects and add other UIs including gameovers, scorecards, timer, etc.

### Day 5
Finish production README, clean up existing work, begin bonus features if possible.

## Bonus Features
1. Different maps with more dynamic map obstacles.
2. Player abilities or special power-ups.
3. Sockets to allow multiplayer capabilities.
4. Multiple players through sockets.

