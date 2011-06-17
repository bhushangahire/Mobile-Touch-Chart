/**
 * @class Ext.fx.target.SpriteGroup
 * @extends Ext.fx.target.Sprite
 * @private
 */

Ext.fx.target.SpriteGroup = Ext.extend(Ext.fx.target.Sprite, {

    getAttr: function(attr, val) {
        var out = [],
            target = this.target;
        target.each(function(sprite) {
            out.push([sprite, val != undefined ? val : this.getFromPrim(sprite, attr)]);
        }, this);
        return out;
    }
});
