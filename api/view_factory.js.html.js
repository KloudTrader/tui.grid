tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_factory.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview View factory\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar ContainerView = require('./container');\nvar ToolbarView = require('./layout/toolbar');\nvar ToolbarControlPanelView = require('./layout/toolbar/controlPanel');\nvar ToolbarPaginationView = require('./layout/toolbar/pagination');\nvar ToolbarResizeHandlerView = require('./layout/toolbar/resizeHandler');\nvar StateLayerView = require('./stateLayer');\nvar ClipboardView = require('./clipboard');\nvar LsideFrameView = require('./layout/frame-lside');\nvar RsideFrameView = require('./layout/frame-rside');\nvar HeaderView = require('./layout/header');\nvar HeaderResizeHandlerView = require('./layout/resizeHandler');\nvar BodyView = require('./layout/body');\nvar BodyTableView = require('./layout/bodyTable');\nvar RowListView = require('./rowList');\nvar SelectionLayerView = require('./selectionLayer');\nvar EditingLayerView = require('./editingLayer');\n\n/**\n * View Factory\n * @module viewFactory\n */\nvar ViewFactory = tui.util.defineClass({\n    init: function(options) {\n        this.domState = options.domState;\n        this.modelManager = options.modelManager;\n        this.painterManager = options.painterManager;\n    },\n\n    /**\n     * Creates container view and returns it.\n     * @param {Object} options - Options set by user\n     * @returns {module:view/container} - New container view instance\n     */\n    createContainer: function(options) {\n        return new ContainerView({\n            el: options.el,\n            singleClickEdit: options.singleClickEdit,\n            dataModel: this.modelManager.dataModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            focusModel: this.modelManager.focusModel,\n            gridId: this.modelManager.gridId,\n            viewFactory: this\n        });\n    },\n\n    /**\n     * Creates toolbar view and returns it.\n     * @returns {module:view/toolbar} - New toolbar view instance\n     */\n    createToolbar: function() {\n        return new ToolbarView({\n            toolbarModel: this.modelManager.toolbarModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            viewFactory: this\n        });\n    },\n\n    /**\n     * Creates toolbar control panel view and returns it.\n     * @returns {module:view/toolbar/controlPanel} - New control panel vew insatnce\n     */\n    createToolbarControlPanel: function() {\n        return new ToolbarControlPanelView({\n            gridId: this.modelManager.gridId,\n            toolbarModel: this.modelManager.toolbarModel\n        });\n    },\n\n    /**\n     * Creates toolbar pagination view and returns it.\n     * @returns {module:view/toolbar/pagination} - New pagination view instance\n     */\n    createToolbarPagination: function() {\n        return new ToolbarPaginationView({\n            toolbarModel: this.modelManager.toolbarModel\n        });\n    },\n\n    /**\n     * Creates toolbar resize handler view and returns it.\n     * @returns {module:view/toolbar/resizeHandler} - New resize hander view instance\n     */\n    createToolbarResizeHandler: function() {\n        return new ToolbarResizeHandlerView({\n            dimensionModel: this.modelManager.dimensionModel\n        });\n    },\n\n    /**\n     * Creates state layer view and returns it.\n     * @returns {module:view/stateLayer} - New state layer view instance\n     */\n    createStateLayer: function() {\n        return new StateLayerView({\n            dimensionModel: this.modelManager.dimensionModel,\n            renderModel: this.modelManager.renderModel\n        });\n    },\n\n    /**\n     * Creates clipboard view and returns it.\n     * @returns {module:view/clipboard} - New clipboard view instance\n     */\n    createClipboard: function() {\n        return new ClipboardView({\n            columnModel: this.modelManager.columnModel,\n            dataModel: this.modelManager.dataModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            selectionModel: this.modelManager.selectionModel,\n            focusModel: this.modelManager.focusModel,\n            renderModel: this.modelManager.renderModel,\n            painterManager: this.modelManager.painterManager\n        });\n    },\n\n    /**\n     * Creates frame view and returns it.\n     * @param  {String} whichSide - 'L'(left) or 'R'(right)\n     * @returns {module:view/layout/frame} New frame view instance\n     */\n    createFrame: function(whichSide) {\n        var Constructor = whichSide === 'L' ? LsideFrameView : RsideFrameView;\n\n        return new Constructor({\n            dimensionModel: this.modelManager.dimensionModel,\n            renderModel: this.modelManager.renderModel,\n            viewFactory: this\n        });\n    },\n\n    /**\n     * Creates header view and returns it.\n     * @param  {String} whichSide - 'L'(left) or 'R'(right)\n     * @returns {module:view/layout/header} New header view instance\n     */\n    createHeader: function(whichSide) {\n        return new HeaderView({\n            whichSide: whichSide,\n            renderModel: this.modelManager.renderModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            focusModel: this.modelManager.focusModel,\n            selectionModel: this.modelManager.selectionModel,\n            dataModel: this.modelManager.dataModel,\n            columnModel: this.modelManager.columnModel,\n            viewFactory: this\n        });\n    },\n\n    /**\n     * Creates resize handler of header view and returns it.\n     * @param  {String} whichSide - 'L'(left) or 'R'(right)\n     * @returns {module:view/layout/header} New resize handler view instance\n     */\n    createHeaderResizeHandler: function(whichSide) {\n        return new HeaderResizeHandlerView({\n            whichSide: whichSide,\n            dimensionModel: this.modelManager.dimensionModel,\n            columnModel: this.modelManager.columnModel\n        });\n    },\n\n    /**\n     * Creates body view and returns it.\n     * @param  {String} whichSide - 'L'(left) or 'R'(right)\n     * @returns {module:view/layout/body} New body view instance\n     */\n    createBody: function(whichSide) {\n        return new BodyView({\n            whichSide: whichSide,\n            renderModel: this.modelManager.renderModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            dataModel: this.modelManager.dataModel,\n            columnModel: this.modelManager.columnModel,\n            selectionModel: this.modelManager.selectionModel,\n            focusModel: this.modelManager.focusModel,\n            viewFactory: this\n        });\n    },\n\n    /**\n     * Creates body-table view and returns it.\n     * @param  {String} whichSide - 'L'(left) or 'R'(right)\n     * @returns {module:view/layout/bodyTable} New body-table view instance\n     */\n    createBodyTable: function(whichSide) {\n        return new BodyTableView({\n            whichSide: whichSide,\n            dimensionModel: this.modelManager.dimensionModel,\n            renderModel: this.modelManager.renderModel,\n            columnModel: this.modelManager.columnModel,\n            painterManager: this.painterManager,\n            viewFactory: this\n        });\n    },\n\n    /**\n     * Creates row list view and returns it.\n     * @param  {Object} options - Options\n     * @param  {jQuery} options.el - jquery object wrapping tbody html element\n     * @param  {String} options.whichSide - 'L'(left) or 'R'(right)\n     * @param  {module:view/layout/bodyTable} options.bodyTableView - body table view\n     * @returns {module:view/rowList} New row list view instance\n     */\n    createRowList: function(options) {\n        return new RowListView({\n            el: options.el,\n            whichSide: options.whichSide,\n            bodyTableView: options.bodyTableView,\n            dataModel: this.modelManager.dataModel,\n            columnModel: this.modelManager.columnModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            selectionModel: this.modelManager.selectionModel,\n            renderModel: this.modelManager.renderModel,\n            focusModel: this.modelManager.focusModel,\n            painterManager: this.painterManager\n        });\n    },\n\n    /**\n     * Creates selection view and returns it.\n     * @param  {String} whichSide - 'L'(left) or 'R'(right)\n     * @returns {module:view/selectionLayer} New selection layer view instance\n     */\n    createSelectionLayer: function(whichSide) {\n        return new SelectionLayerView({\n            whichSide: whichSide,\n            selectionModel: this.modelManager.selectionModel,\n            dimensionModel: this.modelManager.dimensionModel,\n            columnModel: this.modelManager.columnModel\n        });\n    },\n\n    /**\n     * Creates editing layer view and returns it.\n     * @returns {module:view/editingLayer}\n     */\n    createEditingLayer: function() {\n        return new EditingLayerView({\n            renderModel: this.modelManager.renderModel,\n            inputPainters: this.painterManager.getInputPainters(true),\n            domState: this.domState\n        });\n    }\n});\n\nmodule.exports = ViewFactory;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"