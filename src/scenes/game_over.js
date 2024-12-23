import k from "../kaplay_ctx.js";

export default function gameOver(citySound) {

    citySound.paused = true

    let bestScore = k.getData("hi-score")
    let currentScore = k.getData("current-score")

    const rankGrades = ['F', 'E', 'D', 'C', 'B', 'A', 'S']
    const rankBoundaries = [50, 80, 100, 200, 300, 400, 500]

    let currentRank = 'F'
    let bestRank = k.getData("hi-rank")

    for (let i = rankGrades.length-1; i >= 0; i--) {
        if (currentScore > rankBoundaries[i]) {
            currentRank = rankGrades[i]
            break
        }
    }
    if (currentScore > bestScore) {
        bestScore = currentScore
        bestRank = currentRank

        k.setData("hi-rank", bestRank)
        k.setData("hi-score", bestScore)
    }

    k.add([
        k.text("GAME OVER", { font: "mania", size: 160 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 300),

    ])
    k.add([
        k.text(`SCORE: ${currentScore}`, { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x/2, k.center().y - 50)
    ])

    k.add([
        k.text(`HI-SCORE: ${bestScore}`, { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(3*k.center().x/2, k.center().y - 50)
    ])

    const bestRankBox = k.add([
        k.rect(400, 400, {radius : 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.WHITE),
        k.pos(3*k.center().x/2, k.center().y + 200),
    ])
    bestRankBox.add([
        k.text(bestRank, {font: "mania", size: 96 }),
        k.anchor("center"),
    ])

    const currentRankBox = k.add([
        k.rect(400, 400, {radius : 4}),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.WHITE),
        k.pos(k.center().x/2, k.center().y + 200),
    ])
    currentRankBox.add([
        k.text(currentRank, {font: "mania", size: 96 }),
        k.anchor("center"),
    ])

    k.wait(1, () => {
        k.add([
            k.text("Press Space/Click/Touch to Play Again", { font: "mania", size: 64 }),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y + 500),
        ]);
        k.onButtonPress("jump", () => k.go("game"));
    });

}