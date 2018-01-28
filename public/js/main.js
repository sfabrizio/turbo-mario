import Camera from './Camera.js'
import Timer from './Timer.js'
import Entity from './Entity.js'
import {loadLevel} from './loader.js'
import {createMario} from './entities.js'
import {setupKeyboard} from './input.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
// context.scale(2,2)

const debug = true;

Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then( ([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;

    mario.pos.set(64, 5);

    level.entities.add(mario);

    setupKeyboard(window, mario);

    if (debug) {
        ['mousedown','mousemove'].forEach( eventName => {
            canvas.addEventListener(eventName, event => {
                if (event.buttons === 1) {
                    mario.vel.set(0, 0);
                    mario.pos.set(event.offsetX, event.offsetY);
                }
            })
        })
    }
    
    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context, camera);
    }

    timer.start();
});