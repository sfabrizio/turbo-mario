export function createSpriteLayer(entities) {   
    return function drarSpriteLayer(context){
        entities.forEach( entity => {
            entity.draw(context);
        })
    }
}

export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    const context = buffer.getContext('2d');
    buffer.width = 2048;
    buffer.height = 240;

    level.tiles.forEach( (tile, x , y) => {
        sprites.drawTile(tile.name, context , x, y)
    });

    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
    };
}

export function createColisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileColider.tiles;
    const tileSize = tileResolver.tileSize;

    const originalgetByIndex = tileResolver.getByIndex;

    tileResolver.getByIndex = (x ,y) => {
        resolvedTiles.push({x,y});
        return originalgetByIndex.call(tileResolver, x,y);
    }
    
    return function drawColisionTile(context) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach( ({x,y}) => {
            context.beginPath();
            context.rect(x * tileSize,
                         y * tileSize , 
                         tileSize, tileSize);
            context.stroke();
        })
        resolvedTiles.length = 0;
        
        context.strokeStyle = 'red';
        level.entities.forEach( (entity) => {
            context.beginPath();
            context.rect(entity.pos.x, 
                         entity.pos.y, 
                         entity.size.x, entity.size.y);
            context.stroke();
        })
    };


}
