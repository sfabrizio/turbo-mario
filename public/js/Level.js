import Compositor from './Compositor.js'
import {Matrix} from './math.js'
import TileColider from './TileColider.js'

export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.colider = new TileColider(this.tiles);
    }

    update(deltaTime) {
        this.entities.forEach( entity => {
            entity.update(deltaTime);
            this.colider.test(entity);
        })
    }
}