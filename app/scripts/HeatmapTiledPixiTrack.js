import {Tiled2DPixiTrack} from './Tiled2DPixiTrack.js';
import {tileProxy} from './TileProxy.js';
import {workerSetPix} from './worker.js';
import {Pool} from 'threads';

export class HeatmapTiledPixiTrack extends Tiled2DPixiTrack {
    constructor(scene, server, uid) {
        /**
         * @param scene: A PIXI.js scene to draw everything to.
         * @param server: The server to pull tiles from.
         * @param uid: The data set to get the tiles from the server
         */
        super(scene, server, uid);
    }


    tileDataToCanvas(pixData, minVisibleValue, maxVisibleValue) {
        let canvas = document.createElement('canvas');

        canvas.width = 256;
        canvas.height = 256;

        let ctx = canvas.getContext('2d');

        ctx.fillStyle = 'transparent';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        let pix = new ImageData(pixData, canvas.width, canvas.height);

        ctx.putImageData(pix, 0,0);

        return canvas;
    }

    setSpriteProperties(sprite, zoomLevel, tilePos, mirrored) {
        let {tileX, tileY, tileWidth, tileHeight} = this.getTilePosAndDimensions(zoomLevel, tilePos);

        console.log('setting sprite:', zoomLevel, tilePos);

        let tileEndX = tileX + tileWidth;
        let tileEndY = tileY + tileHeight;

        let spriteWidth = this._refXScale(tileEndX) - this._refXScale(tileX) ;
        let spriteHeight = this._refYScale(tileEndY) - this._refYScale(tileY)

            sprite.width = this._refXScale(tileEndX) - this._refXScale(tileX)
            sprite.height = this._refYScale(tileEndY) - this._refYScale(tileY)

            if (mirrored) {
                // this is a mirrored tile that represents the other half of a 
                // triangular matrix
                sprite.x = this._refXScale(tileY);
                sprite.y = this._refYScale(tileX);

                //sprite.pivot = [this._refXScale()[1] / 2, this._refYScale()[1] / 2];
            
                // I think PIXIv3 used a different method to set the pivot value
                // because the code above no longer works as of v4
                sprite.rotation = -Math.PI / 2;
                sprite.scale.x *= -1;

                sprite.width = spriteHeight;
                sprite.height = spriteWidth;
            } else {
                sprite.x = this._refXScale(tileX);
                sprite.y = this._refYScale(tileY);
            }

        /*
        console.log('sprite.x:', sprite.x);
        console.log('sprite.y:', sprite.y);
        console.log('sprite.scale:', sprite.scale);
        */
    }

    minVisibleValue() {
         let min = Math.min.apply(null, Object.keys(this.fetchedTiles).map(x => this.fetchedTiles[x].tileData.minNonZero));
         return min;
    }

    maxVisibleValue() {
         let max = Math.max.apply(null, Object.keys(this.fetchedTiles).map(x => this.fetchedTiles[x].tileData.maxNonZero));
         return max;
    }

    refXScale(_) {
        super.refXScale(_);

        this.draw();
    }

    refYScale(_) {
        super.refYScale(_);

        this.draw();
    }

    draw() {

    }


    initTile(tile) {
        /**
         * Convert the raw tile data to a rendered array of values which can be represented as a sprite.
         *
         * @param tile: The data structure containing all the tile information. Relevant to
         *              this function are tile.tileData = {'dense': [...], ...}
         *              and tile.graphics
         */
        console.log('initTile:', tile.tileId);
        tileProxy.tileDataToPixData(tile, this.minVisibleValue(), 
                                                  this.maxVisibleValue(), 
                                                  function(pixData) {
            // the tileData has been converted to pixData by the worker script and needs to be loaded 
            // as a sprite
            //console.log('tile:', tile);
            let graphics = tile.graphics;
            let canvas = this.tileDataToCanvas(pixData,  this.minVisibleValue(), this.maxVisibleValue());

            let sprite = null;

            if (tile.tileData.zoomLevel == this.maxZoom)
                sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas, PIXI.SCALE_MODES.NEAREST));
            else
                sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));

            this.setSpriteProperties(sprite, tile.tileData.zoomLevel, tile.tileData.tilePos, tile.mirrored);

            graphics.removeChildren();
            graphics.addChild(sprite);
        }.bind(this));

        //console.log('pixData:', pixData);
    }
}
