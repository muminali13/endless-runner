import k from "../kaplay_ctx.js";

export default function gameOver() {
    k.add([k.text("GAME OVER"), k.pos(k.center())])
    k.add([k.text("You scored: " + 0), k.pos(k.center().x, k.center().y + 50)])

}