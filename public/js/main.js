import Compositor from './Compositor.js'
import Entity from './Entity.js'
import Timer from './Timer.js'
import {loadLevel} from './loader.js'
import {loadBackgroundSprites} from './sprites.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'
import {createMario} from './entities.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d"); 

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then( ([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const gravity = 30;
    const spritesLayer = createSpriteLayer(mario);
    comp.layers.push(spritesLayer);
    
    const timer = new Timer();

    timer.update = function update(deltaTime) {
            comp.draw(context);
            mario.update(deltaTime);
            mario.vel.y += gravity;
    }
    
    timer.start();
});