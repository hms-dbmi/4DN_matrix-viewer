import {Tiled2DPixiTrack} from './Tiled2DPixiTrack.js';
import {tileProxy} from './TileProxy.js';

export class Id2DTiledPixiTrack extends Tiled2DPixiTrack {
    constructor(scene, server, uid) {
        super(scene, server, uid);

        this.text
    }

    areAllVisibleTilesLoaded() {
        
        // we don't need to wait for any tiles to load before 
        // drawing
        //
        return true;
    }

    createTile(tile, graphics) {
        /**
         * Create whatever is needed to draw this tile.
         */
         
        tile.textGraphics = new PIXI.Graphics();
        tile.text = new PIXI.Text(tile.tileData.zoomLevel + "/" + tile.tileData.tilePos.join('/') + '/' + tile.mirrored, 
                              {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});

        tile.textGraphics.addChild(tile.text);
        graphics.addChild(tile.textGraphics);

        this.drawTile(tile, graphics);
    }

    destroyTile(tile, graphics) {

    }

    drawTile(tile, graphics) {
        let {tileX, tileY, tileWidth, tileHeight} = this.getTilePosAndDimensions(tile.tileData.zoomLevel, 
                                                                                 tile.tileData.tilePos);

        console.log('tile', tile);
        /*
        t.position.x = 0;
        t.position.y = 0;
        */

        // the text needs to be scaled down so that it doesn't become huge
        // when we zoom in 
        let tSX = 1 / ((this._xScale(1) - this._xScale(0)) / (this._refXScale(1) - this._refXScale(0)));
        let tSY = 1 / ((this._yScale(1) - this._yScale(0)) / (this._refYScale(1) - this._refYScale(0)));

        graphics.lineStyle(2 * tSX, 0x0000FF, 2);
        graphics.beginFill(0xFF700B, 0.4);
        graphics.alpha = 0.5;

        tile.text.scale.x = tSX;
        tile.text.scale.y = tSY;

        console.log('tSX:', tSX, 'tSY:',tSY);

        graphics.clear();

        // line needs to be scaled down so that it doesn't become huge


        // fun tile positioning when it's mirrored, except this is just a rectangle
        // that doesn't need to be rotated so it's easy
        if (tile.mirrored) {
            tile.textGraphics.position.x = this._refXScale(tileY) + 5;
            tile.textGraphics.position.y = this._refYScale(tileX) + 5;

            graphics.drawRect(this._refXScale(tileY), this._refYScale(tileX),
                              this._refXScale(tileY + tileWidth) - this._refXScale(tileY),
                              this._refYScale(tileX + tileWidth) - this._refYScale(tileX))
        } else {
            tile.textGraphics.position.x = this._refXScale(tileX) + 5;
            tile.textGraphics.position.y = this._refYScale(tileY) + 5;

            graphics.drawRect(this._refXScale(tileX), this._refYScale(tileY),
                              this._refXScale(tileX + tileWidth) - this._refXScale(tileX),
                              this._refYScale(tileY + tileWidth) - this._refYScale(tileY))

        }
    }

    fetchNewTiles(toFetch) {
        // no real fetching involved... we just need to display the data
        toFetch.map(x => {
            let key = x.remoteId;
            let keyParts = key.split('.');

            let data = {
                zoomLevel: keyParts[1],
                tilePos: keyParts.slice(2, keyParts.length).map(x => +x)
            }

            this.fetchedTiles[x.tileId] = x;
            this.fetchedTiles[x.tileId].tileData = data;

            // since we're not actually fetching remote data, we can easily 
            // remove these tiles from the fetching list
            if (this.fetching.has(x.remoteId))
                this.fetching.delete(x.remoteId);
        });

        this.synchronizeTilesAndGraphics();
    }

    updateGraphicsForExistingTile(fetchedTile, tileGraphics) {
        console.log('fetchedTile:', fetchedTile);

        this.drawTile(fetchedTile, tileGraphics);
    }
}
