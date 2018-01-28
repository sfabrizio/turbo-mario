import KeyboardHandler from './KeyboardHandler.js'

export function setupKeyboard (window, entity) { 
    const input = new KeyboardHandler(window);

    input.addKeyBinding('Space', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });
    input.addKeyBinding('ArrowLeft', keyState => {
        entity.go.dir = -keyState;
    });
    input.addKeyBinding('ArrowRight', keyState => {
        entity.go.dir = keyState;
    });
}