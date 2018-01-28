import TileResolver from './TileResolver.js'

export default class TileColider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    test(Entity) {
        const match = this.tiles.matchByPosition(Entity.pos.x, Entity.pos.y)
        if (match) {
            console.log('colition on: ', match, match.tile)
            // if (match.tile.name === "ground") {
            //     Entity.pos.set(64, 5);
            //     Entity.vel.set(0, 0);
            // }
        }
    }
}