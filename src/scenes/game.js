import k from "../kaplay_ctx.js"
import makeSonic from "../entities/sonic.js";
import background from "./background.js";
import makeMotobug from "../entities/motobug.js";
import makeRing from "../entities/ring.js";

export default function game() {
    k.setGravity(3100);

    const citySound = k.play("city", {volume: 0.6, loop: true});

    const bg = new background()

    let gameSpeed = 500;
    let score = 0;
    let scoreMultiplier = 1;

    const scoreText = k.add([
        k.text("SCORE: 0", {font: "mania", size: 72}),
        k.pos(20, 20)
    ])

    const sonic = makeSonic(k.vec2(300, 760))
    sonic.setControls()
    sonic.setEvents()
    sonic.onCollide("enemy", (enemy) => {
        if (!sonic.isGrounded()) {
            k.play("destroy")
            k.play("hyper-ring")
            k.destroy(enemy)
            sonic.play("jump")
            sonic.jump()

            score += 10 * scoreMultiplier

            scoreText.text = "SCORE: " + score;

            if (scoreMultiplier === 1) sonic.ringCollectUI.text = "+10"
            else sonic.ringCollectUI.text = `x${scoreMultiplier}`
            k.wait(1, () => {sonic.ringCollectUI.text = ""})

            scoreMultiplier += 1
            return;
        }

        k.play("hurt")

        k.setData("current-score", score)
        k.go("game-over", citySound)

    })
    sonic.onCollide("ring", (ring) => {

        k.play("ring", { volume: 0.5 })
        k.destroy(ring)
        score += 1
        scoreText.text = "SCORE: " + score;
        sonic.ringCollectUI.text = "+1"
        k.wait(1, () => {sonic.ringCollectUI.text = ""})

    })

    const spawnMotoBugs = () => {
        const motoBug = makeMotobug(k.vec2(1950, 773))
        motoBug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motoBug.move(-gameSpeed - 300, 0)
                return;
            }
            motoBug.move(-gameSpeed, 0)
        })

        motoBug.onExitScreen(() => {
            if (motoBug.pos.x < 0) {
                k.destroy(motoBug)
            }
        })

        const waitTime = k.rand(0.5, 2.5)
        k.wait(waitTime, spawnMotoBugs)
    }
    spawnMotoBugs()

    const spawnRings = () => {
        const ring = makeRing(k.vec2(1950, 745));
        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0)
        })
        ring.onExitScreen(() => {
            if (ring.pos.x < 0) {
                k.destroy(ring)
            }
        })

        const waitTime = k.rand(0.2, 5)
        k.wait(waitTime, spawnRings)
    }
    spawnRings()

    k.add([
        k.rect(k.width(), 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({isStatic: true}),
    ])


    k.loop(1, () => {
        gameSpeed += 20
    })

    k.onUpdate(() => {
        bg.update(gameSpeed)

        if (scoreMultiplier > 1) {
            if (sonic.isGrounded()) {
                scoreMultiplier = 1
            }
        }
    })

}