import k from "../kaplay_ctx.js"


const background = function () {

    this.bgWidth= 1920*2;
    this.platformsWidth= 1280*4;
    this.bgPieces = [
        k.add([
            k.sprite("chemical-bg"),
            k.pos(0, 0),
            k.scale(2),
            k.opacity(0.1),
        ]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(this.bgWidth, 0),
            k.scale(2),
            k.opacity(0.1)
        ]),
    ]

    this.platforms = [
        k.add([k.sprite("platform"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platform"), k.pos(this.platformsWidth, 450), k.scale(4)])
    ]

    this.update = (speed) => {
        if (this.bgPieces[1].pos.x <= 0) {
            this.bgPieces[0].moveTo(this.bgPieces[1].pos.x + this.bgWidth)
            this.bgPieces.push(this.bgPieces.shift())
        }

        if (this.platforms[1].pos.x <= 0) {
            this.platforms[0].moveTo(this.platforms[1].pos.x + this.platformsWidth)
            this.platforms.push(this.platforms.shift())
        }

        this.bgPieces[0].move(-speed/5, 0);
        this.bgPieces[1].moveTo(this.bgPieces[0].pos.x + this.bgWidth, 0);

        this.platforms[0].move(-speed, 0);
        this.platforms[1].moveTo(this.platforms[0].pos.x + this.platformsWidth, 450);
    }
}

export default background;