import k from "../kaplay_ctx.js"

export default function makeRing(pos) {

    return k.add([
        k.sprite("ring", {anim: "spin"}),
        k.area(),
        k.scale(4),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(),
        "ring"
    ])
}