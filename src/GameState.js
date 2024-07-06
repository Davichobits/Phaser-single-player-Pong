class GameState {
  constructor() {
    this.reset();
  }
  reset() {
    this.points = 0;
    this.level = 1;
  }
  addPoints(points) {
    this.points += points;
  }

  setLevel(level) {
    this.level = level;
  }

  getPoints() {
    return this.points;
  }

  getLevel() {
    return this.level;
  }
}

export const gameState = new GameState();