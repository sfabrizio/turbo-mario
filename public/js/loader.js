import Level from './Level.js'
import {loadBackgroundSprites} from './sprites.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'

export function loadImage (url) {
    return new Promise( resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        })
        image.src = url;
    })
}

export function loadLevel(name) {
    return Promise.all([
        loadBackgroundSprites(),
        fetch(`/levels/${name}.json`).then( r => {
            return r.json();
        })
    ])
    .then(([backgroundSprites, levelSpec]) => {
        const level = new Level();

        const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
        
        const spritesLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spritesLayer);
        
        return level;
    })
}