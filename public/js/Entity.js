import {Vec2} from './math.js'

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update () {
        console.warn('Update method not implement on this Trait', this);
    }

}

export default class Entity {
    constructor(){
        this.vel = new Vec2(0, 0);
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.traits = [];
    }

    addTrait (trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update (deltaTime) {
        this.traits.forEach( trait => {
            trait.update(this, deltaTime);
        })
    }
}