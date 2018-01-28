import Compositor from './Compositor.js'
import {Matrix} from './math.js'
import TileColider from './TileColider.js'

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileColider = new TileColider(this.tiles);
        this.gravity = 2000;
    }

    update(deltaTime) {
        this.entities.forEach( entity => {
            entity.update(deltaTime);
            
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileColider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileColider.checkY(entity);

            this.tileColider.test(entity);
            
            entity.vel.y += this.gravity * deltaTime;
        })
    }
}