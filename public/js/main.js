import Compositor from './Compositor.js'
import {loadLevel} from './loader.js'
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then( ([marioSprite, sprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);

    const pos = {
        x: 64,
        y: 64
    }
    
    const spritesLayer = createSpriteLayer(marioSprite , pos);
    
    comp.layers.push(backgroundLayer);
    comp.layers.push(spritesLayer);

    function update() {
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }
    update();
});