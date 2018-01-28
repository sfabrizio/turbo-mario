import Entity from './Entity.js'
import Timer from './Timer.js'
import KeyboardHandler from './KeyboardHandler.js'
import {loadLevel} from './loader.js'
import {createMario} from './entities.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
// context.scale(2,2)

const mouseDebug = true;

Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then( ([mario, level]) => {
    const gravity = 800;
    mario.pos.set(64, 5);

    level.entities.add(mario);

    const input = new KeyboardHandler(window);
    
    input.addKeyBinding('Space', keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });

    if (mouseDebug) {
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
        level.comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();
});