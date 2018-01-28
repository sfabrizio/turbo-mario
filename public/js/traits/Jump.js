import {Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0 ) {
            entity.vel.y = -this.velocity
            this.engageTime -= deltaTime;
        }
    }

    start(entity) {
      this.engageTime = this.duration;
    }
    
    cancel(entity) {
      this.engageTime = 0;
    }
} 