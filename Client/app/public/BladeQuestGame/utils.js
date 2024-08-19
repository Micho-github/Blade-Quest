export function getClickCoords(gameWidth, input) {
  return input.clickCoords.x >= gameWidth / 2 ? "right" : "left";
}

export function drawHealthbar(ctx, player) {
  const barWidth = 50;
  ctx.fillStyle = "black";
  ctx.rect(
    player.x + player.width / 2 + 5,
    player.y - player.height - 30,
    barWidth,
    10
  );
  ctx.stroke();
  ctx.fillStyle = player.health < 20 ? "red" : "green";
  if (player.health > 0)
    ctx.fillRect(
      player.x + player.width / 2 + 6,
      player.y - player.height - 29,
      (player.health * barWidth) / player.maxHealth - 2,
      8
    );
}

export function displayCoins(ctx, player) {
  ctx.font = "26px Monospace";
  ctx.fillStyle = "orange";
  ctx.fillText(`Coins: ${player.coins}`, 10, 30);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.5;
  ctx.strokeText(`Coins: ${player.coins}`, 10, 30);
}
