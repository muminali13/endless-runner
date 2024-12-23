import kaplay from 'kaplay';

const k = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    buttons: {
        jump: {
            keyboard: ["w", "space", "up"],
            mouse: ["left"]
        }
    },
    debugKey: "i",
    debug: true
});

export default k;