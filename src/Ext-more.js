
Ext.apply(Ext, {
    
    baseCSSPrefix: 'x-',
    
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substr(1);
    },
    
    /**
    * Copies a set of named properties fom the source object to the destination object.
    * <p>example:<pre><code>
        ImageComponent = Ext.extend(Ext.Component, {
            initComponent: function() {
                this.autoEl = { tag: 'img' };
                MyComponent.superclass.initComponent.apply(this, arguments);
                this.initialBox = Ext.copyTo({}, this.initialConfig, 'x,y,width,height');
            }
        });
    * </code></pre>
    * @param {Object} dest The destination object.
    * @param {Object} source The source object.
    * @param {Array/String} names Either an Array of property names, or a comma-delimited list
    * of property names to copy.
    * @param {Boolean} usePrototypeKeys (Optional) Defaults to false. Pass true to copy keys off of the prototype as well as the instance.
    * @return {Object} The modified object.
   */
   copyTo : function(dest, source, names, usePrototypeKeys){
       if(typeof names == 'string'){
           names = names.split(/[,;\s]/);
       }
       Ext.each(names, function(name){
           if(usePrototypeKeys || source.hasOwnProperty(name)){
               dest[name] = source[name];
           }
       }, this);
       return dest;
   },
   
    /**
    * Used internally by the mixins pre-processor
    * @private
    */
   mixin: function(scope, name, cls) {
       var me =  scope;
       var mixinPrototype = cls.prototype,
           myPrototype = me.prototype,
           i;

       for (i in mixinPrototype) {
           if (mixinPrototype.hasOwnProperty(i)) {
               if (myPrototype[i] === undefined) {
                   /*if (Ext.isFunction(mixinPrototype[i])) {
                       me.borrowMethod(i, mixinPrototype[i]);
                   }
                   else {
                       myPrototype[i] = mixinPrototype[i];
                   }*/
                   myPrototype[i] = mixinPrototype[i];
               }
               // don't support 'config' in touch framework
               /*else if (i === 'config' && Ext.isObject(myPrototype[i]) && Ext.isObject(mixinPrototype[i])) {
                   Ext.Object.merge(myPrototype[i], mixinPrototype[i]);
               }*/
           }
       }

       if (!myPrototype.mixins) {
           myPrototype.mixins = {};
       }

       myPrototype.mixins[name] = mixinPrototype;
   }
});

Ext.Number = Ext.util.Numbers;

Ext.ns(
    'Ext.fx',
    'Ext.fx.target',
    'Ext.chart',
    'Ext.chart.axis',
    'Ext.chart.series',
    'Ext.chart.theme',
    'Ext.draw',
    'Ext.draw.engine'
);