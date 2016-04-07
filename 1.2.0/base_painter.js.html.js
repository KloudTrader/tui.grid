tui.util.defineNamespace("fedoc.content", {});
fedoc.content["base_painter.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Base class for Painters\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\n/**\n * Base class for Painters\n * The Painter class is implentation of 'flyweight' pattern for the View class.\n * This aims to act like a View class but doesn't create an instance of each view items\n * to improve rendering performance.\n * @module base/painter\n */\nvar Painter = tui.util.defineClass(/**@lends module:base/painter.prototype */{\n    /**\n     * @constructs\n     * @param {Object} options - options\n     */\n    init: function(options) {\n        this.controller = options.controller;\n    },\n\n    /**\n     * key-value object contains event names as keys and handler names as values\n     * @type {Object}\n     */\n    events: {},\n\n    /**\n     * css selector to use delegated event handlers by '$.on()' method.\n     * @type {String}\n     */\n    selector: '',\n\n    /**\n     * Returns the cell address of the target element.\n     * @param {jQuery} $target - target element\n     * @returns {{rowKey: String, columnName: String}}\n     * @private\n     */\n    _getCellAddress: function($target) {\n        var $addressHolder = $target.closest('[data-row-key]');\n\n        return {\n            rowKey: $addressHolder.attr('data-row-key'),\n            columnName: $addressHolder.attr('data-column-name')\n        };\n    },\n\n    /**\n     * Attaches all event handlers to the $target element.\n     * @param {jquery} $target - target element\n     * @param {String} parentSelector - selector of a parent element\n     */\n    attachEventHandlers: function($target, parentSelector) {\n        _.each(this.events, function(methodName, eventName) {\n            var boundHandler = _.bind(this[methodName], this),\n                selector = parentSelector + ' ' + this.selector;\n\n            $target.on(eventName, selector, boundHandler);\n        }, this);\n    },\n\n    /**\n     * Generates a HTML string from given data, and returns it.\n     * @abstract\n     */\n    generateHtml: function() {\n        throw new Error('implement generateHtml() method');\n    }\n});\n\nmodule.exports = Painter;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"