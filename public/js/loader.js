import Level from './Level.js'
import {loadBackgroundSprites} from './sprites.js'
import {createBackgroundLayer, createSpriteLayer, createColisionLayer} from './layers.js'

export function loadImage (url) {
    return new Promise( resolve => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        })
        image.src = url;
    })
}

export function createTiles(level, backgrounds) {
    backgrounds.forEach( background => {    
        background.ranges.forEach( ([x1, x2, y1 , y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tiles.set( x, y, {
                        name: background.tile
                    });
                }
            }
        });
    });
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

        createTiles(level, levelSpec.backgrounds);
        
        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
        
        const spritesLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spritesLayer);

        const colisionLayer = createColisionLayer(level);
        level.comp.layers.push(colisionLayer);
        

        return level;
    })
}