const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardHandler {
    constructor(window) {
        this.keyMapping = new Map();
        this.keyState = new Map();
        this.listenTo(window);
    }

    addKeyBinding(keyName, callback) {
        this.keyMapping.set(keyName, callback);
    }

    handleEvent(event) {
        const {code, type} = event
        
        if ( !this.keyMapping.has(code) ) { 
            // console.log('not mapped code: ', code)
            return; 
        }
        event.preventDefault();
        
        const keyState = type === "keydown" ? PRESSED : RELEASED;
        if (keyState === this.keyState.get(code) ) { return; }
        this.keyState.set(code, keyState)

        const callback = this.keyMapping.get(code);
        callback(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach( eventName => {
            window.addEventListener(eventName, this.handleEvent.bind(this) );
        })
    }

}