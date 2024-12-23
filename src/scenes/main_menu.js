import k from "../kaplay_ctx.js"
import makeSonic from "../entities/sonic.js";
import background from "./background.js";


export default function mainMenu() {

    k.onButtonDown("jump", () => k.go("game"))

    let bg = new background()

    k.add([
        k.text("Sonic Ring Run", {font: "mania", size: 160}),
        k.pos(k.center().x, k.center().y - 200),
        k.anchor("center")
    ])

    k.add([
        k.text("SPACE/CLICK/TOUCH TO START", {font: "mania", size: 64}),
        k.pos(k.center().x, k.center().y),
        k.anchor("center")
    ])
    makeSonic(k.vec2(300, 760));

    k.add([
        k.rect(k.width(), 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({isStatic: true}),
    ])

    k.onUpdate(() => {
        bg.update(1000)
    })
}