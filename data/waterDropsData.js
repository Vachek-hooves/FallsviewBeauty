export const WaterDropsGame = [
  { id: 1, level: 1, highScore: 0, speed: 2, unlocked: true },
];

export const createNextLevel = (previousLevel) => {
  return {
    id: previousLevel.id + 1,
    level: previousLevel.level + 1,
    highScore: 0,
    speed: Math.min(previousLevel.speed + 0.5, 10), // Increase speed, max 10
    unlocked: true,
  };
};
