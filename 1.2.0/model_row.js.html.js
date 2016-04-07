tui.util.defineNamespace("fedoc.content", {});
fedoc.content["model_row.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Row Model for Rendering (View Model)\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Model = require('../base/model');\nvar util = require('../common/util');\n\n/**\n * Row Model\n * @module model/row\n * @extends module:base/model\n */\nvar Row = Model.extend(/**@lends module:model/row.prototype */{\n    /**\n     * @constructs\n     * @param  {object} attributes - Attributes\n     * @param  {object} options - Options\n     */\n    initialize: function(attributes) {\n        var rowKey = attributes &amp;&amp; attributes.rowKey,\n            dataModel = this.collection.dataModel,\n            rowData = dataModel.get(rowKey);\n\n        this.dataModel = dataModel;\n        this.columnModel = this.collection.columnModel;\n        this.focusModel = this.collection.focusModel;\n\n        if (rowData) {\n            this.listenTo(rowData, 'change', this._onDataModelChange);\n            this.listenTo(rowData, 'restore', this._onDataModelRestore);\n            this.listenTo(rowData, 'extraDataChanged', this._setRowExtraData);\n            this.listenTo(dataModel, 'disabledChanged', this._onDataModelDisabledChanged);\n            this.rowData = rowData;\n        }\n    },\n\n    idAttribute: 'rowKey',\n\n    /**\n     * Event handler for 'change' event on module:data/row\n     * @param {Object} rowData - RowData model on which event occurred\n     * @private\n     */\n    _onDataModelChange: function(rowData) {\n        _.each(rowData.changed, function(value, columnName) {\n            var column, isTextType;\n\n            if (this.has(columnName)) {\n                column = this.columnModel.getColumnModel(columnName);\n                isTextType = this.columnModel.isTextType(columnName);\n\n                this.setCell(columnName, this._getValueAttrs(value, rowData, column, isTextType));\n            }\n        }, this);\n    },\n\n    /**\n     * Event handler for 'restore' event on module:data/row\n     * @param {String} columnName - columnName\n     * @private\n     */\n    _onDataModelRestore: function(columnName) {\n        var cellData = this.get(columnName);\n        if (cellData) {\n            this.trigger('restore', cellData);\n        }\n    },\n\n    /**\n     * Returns an array of visible column names.\n     * @returns {Array.&lt;String>} Visible column names\n     * @private\n     */\n    _getColumnNameList: function() {\n        var columnModels = this.collection.columnModel.getVisibleColumnModelList(null, true);\n\n        return _.pluck(columnModels, 'columnName');\n    },\n\n    /**\n     * Event handler for 'disabledChanged' event on dataModel\n     */\n    _onDataModelDisabledChanged: function() {\n        var columnNames = this._getColumnNameList();\n\n        _.each(columnNames, function(columnName) {\n            this.setCell(columnName, {\n                isDisabled: this.rowData.isDisabled(columnName),\n                className: this._getClassNameString(columnName)\n            });\n        }, this);\n    },\n\n    /**\n     * Sets the 'isDisabled', 'isEditable', 'className' property of each cell data.\n     * @private\n     */\n    _setRowExtraData: function() {\n        var dataModel = this.collection.dataModel,\n            columnNames = this._getColumnNameList(),\n            param;\n\n        if (tui.util.isUndefined(this.collection)) {\n            return;\n        }\n\n        _.each(columnNames, function(columnName) {\n            var cellData = this.get(columnName),\n                rowModel = this, // eslint-disable-line consistent-this\n                cellState;\n\n            if (!tui.util.isUndefined(cellData)) {\n                cellState = this.rowData.getCellState(columnName);\n                if (dataModel.isRowSpanEnable() &amp;&amp; !cellData.isMainRow) {\n                    rowModel = this.collection.get(cellData.mainRowKey);\n                }\n                if (rowModel) {\n                    param = {\n                        isDisabled: cellState.isDisabled,\n                        isEditable: cellState.isEditable,\n                        className: this._getClassNameString(columnName)\n                    };\n                    rowModel.setCell(columnName, param);\n                }\n            }\n        }, this);\n    },\n\n    /**\n     * Overrides Backbone.Model.parse\n     * (this method is called before initialize method)\n     * @param {Array} data - Original data\n     * @param {Object} options - Options\n     * @returns {Array} - Converted data.\n     * @override\n     */\n    parse: function(data, options) {\n        var collection = options.collection;\n\n        return this._formatData(data, collection.dataModel, collection.columnModel, collection.focusModel);\n    },\n\n    /**\n     * Convert the original data to the rendering data.\n     * @param {Array} data - Original data\n     * @param {module:model/data/rowList} dataModel - Data model\n     * @param {module:model/data/columnModel} columnModel - Column model\n     * @param {module:model/data/focusModel} focusModel - focus model\n     * @param {Number} rowHeight - The height of a row\n     * @returns {Array} - Converted data\n     * @private\n     */\n    _formatData: function(data, dataModel, columnModel, focusModel) {\n        var rowKey = data.rowKey,\n            columnData, row;\n\n        if (_.isUndefined(rowKey)) {\n            return data;\n        }\n\n        row = dataModel.get(rowKey);\n        columnData = _.omit(data, 'rowKey', '_extraData', 'height');\n\n        _.each(columnData, function(value, columnName) {\n            var rowSpanData = this._getRowSpanData(columnName, data, dataModel.isRowSpanEnable()),\n                cellState = row.getCellState(columnName),\n                isTextType = columnModel.isTextType(columnName),\n                column = columnModel.getColumnModel(columnName);\n\n            data[columnName] = {\n                rowKey: rowKey,\n                columnName: columnName,\n                rowSpan: rowSpanData.count,\n                isMainRow: rowSpanData.isMainRow,\n                mainRowKey: rowSpanData.mainRowKey,\n                isEditable: cellState.isEditable,\n                isDisabled: cellState.isDisabled,\n                isEditing: focusModel.isEditingCell(rowKey, columnName),\n                isFocused: focusModel.isCurrentCell(rowKey, columnName),\n                optionList: tui.util.pick(column, 'editOption', 'list'),\n                className: this._getClassNameString(columnName, row, focusModel),\n                columnModel: column,\n                changed: [] //changed property names\n            };\n            _.assign(data[columnName], this._getValueAttrs(value, row, column, isTextType));\n        }, this);\n\n        return data;\n    },\n\n    /**\n     * Returns the class name string of the a cell.\n     * @param {String} columnName - column name\n     * @param {module:model/data/row} [row] - data model of a row\n     * @param {module:model/focus} [focusModel] - focus model\n     * @returns {String}\n     */\n    _getClassNameString: function(columnName, row, focusModel) {\n        var classNames;\n\n        if (!row) {\n            row = this.dataModel.get(this.get('rowKey'));\n        }\n        if (!focusModel) {\n            focusModel = this.focusModel;\n        }\n        classNames = row.getClassNameList(columnName);\n\n        if (focusModel.isCurrentCell(row.get('rowKey'), columnName, true)) {\n            classNames.push('focused');\n        }\n\n        return classNames.join(' ');\n    },\n\n    /**\n     * Returns the values of the attributes related to the cell value.\n     * @param {String|Number} value - Value\n     * @param {module:model/data/row} row - Row data model\n     * @param {Object} column - Column model object\n     * @param {Boolean} isTextType - True if the cell is the text-type\n     * @returns {Object}\n     * @private\n     */\n    _getValueAttrs: function(value, row, column, isTextType) {\n        var beforeContent = tui.util.pick(column, 'editOption', 'beforeContent'),\n            afterContent = tui.util.pick(column, 'editOption', 'afterContent'),\n            converter = tui.util.pick(column, 'editOption', 'converter'),\n            rowAttrs = row.toJSON();\n\n        return {\n            value: this._getValueToDisplay(value, column, isTextType),\n            formattedValue: this._getFormattedValue(value, rowAttrs, column),\n            beforeContent: this._getExtraContent(beforeContent, value, rowAttrs),\n            afterContent: this._getExtraContent(afterContent, value, rowAttrs),\n            convertedHTML: this._getConvertedHTML(converter, value, rowAttrs)\n        };\n    },\n\n    /**\n     * If the column has a 'formatter' function, exeucute it and returns the result.\n     * @param {String} value - value to display\n     * @param {Object} rowAttrs - All attributes of the row\n     * @param {Object} column - Column info\n     * @returns {String}\n     * @private\n     */\n    _getFormattedValue: function(value, rowAttrs, column) {\n        var result = value || '';\n\n        if (_.isFunction(column.formatter)) {\n            result = column.formatter(result, rowAttrs, column);\n        }\n\n        return result;\n    },\n\n    /**\n     * Returns the value of the 'beforeContent' or 'afterContent'.\n     * @param {(String|Function)} content - content\n     * @param {String} cellValue - cell value\n     * @param {Object} rowAttrs - All attributes of the row\n     * @returns {string}\n     * @private\n     */\n    _getExtraContent: function(content, cellValue, rowAttrs) {\n        var result = '';\n\n        if (_.isFunction(content)) {\n            result = content(cellValue, rowAttrs);\n        } else if (tui.util.isExisty(content)) {\n            result = content;\n        }\n\n        return result;\n    },\n\n    /**\n     * If the 'converter' function exist, execute it and returns the result.\n     * @param {Function} converter - converter\n     * @param {String} cellValue - cell value\n     * @param {Object} rowAttrs - All attributes of the row\n     * @returns {(String|Null)} - HTML string or Null\n     * @private\n     */\n    _getConvertedHTML: function(converter, cellValue, rowAttrs) {\n        var convertedHTML = null;\n\n        if (_.isFunction(converter)) {\n            convertedHTML = converter(cellValue, rowAttrs);\n        }\n        if (convertedHTML === false) {\n            convertedHTML = null;\n        }\n        return convertedHTML;\n    },\n\n    /**\n     * Returns the value to display\n     * @param {String|Number} value - value\n     * @param {String} column - column name\n     * @param {Boolean} isTextType - True if the cell is the text-typee\n     * @returns {String}\n     * @private\n     */\n    _getValueToDisplay: function(value, column, isTextType) {\n        var isExisty = tui.util.isExisty,\n            notUseHtmlEntity = column.notUseHtmlEntity,\n            defaultValue = column.defaultValue;\n\n        if (!isExisty(value)) {\n            value = isExisty(defaultValue) ? defaultValue : '';\n        }\n\n        if (isTextType &amp;&amp; !notUseHtmlEntity &amp;&amp; tui.util.hasEncodableString(value)) {\n            value = tui.util.encodeHTMLEntity(value);\n        }\n\n        return value;\n    },\n\n    /**\n     * Returns the rowspan data.\n     * @param {String} columnName - column name\n     * @param {Object} data - data\n     * @param {Boolean} isRowSpanEnable - Whether the rowspan enable\n     * @returns {Object} rowSpanData\n     * @private\n     */\n    _getRowSpanData: function(columnName, data, isRowSpanEnable) {\n        var rowSpanData = tui.util.pick(data, '_extraData', 'rowSpanData', columnName);\n\n        if (!isRowSpanEnable || !rowSpanData) {\n            rowSpanData = {\n                mainRowKey: data.rowKey,\n                count: 0,\n                isMainRow: true\n            };\n        }\n        return rowSpanData;\n    },\n\n    /**\n     * Updates the className attribute of the cell identified by a given column name.\n     * @param {String} columnName - column name\n     */\n    updateClassName: function(columnName) {\n        this.setCell(columnName, {\n            className: this._getClassNameString(columnName)\n        });\n    },\n\n    /**\n     * Sets the cell data.\n     * (Each cell data is reference type, so do not change the cell data directly and\n     *  use this method to trigger change event)\n     * @param {String} columnName - Column name\n     * @param {Object} param - Key-Value pair of the data to change\n     */\n    setCell: function(columnName, param) {\n        var isValueChanged = false,\n            changed = [],\n            rowIndex, rowKey, data;\n\n        if (!this.has(columnName)) {\n            return;\n        }\n\n        rowKey = this.get('rowKey');\n        data = _.clone(this.get(columnName));\n\n        _.each(param, function(changeValue, name) {\n            if (!util.isEqual(data[name], changeValue)) {\n                isValueChanged = (name === 'value') ? true : isValueChanged;\n                data[name] = changeValue;\n                changed.push(name);\n            }\n        }, this);\n\n        if (changed.length) {\n            data.changed = changed;\n            this.set(columnName, data, {\n                silent: this._shouldSetSilently(data, isValueChanged)\n            });\n            if (isValueChanged &amp;&amp; !data.isEditing) {\n                rowIndex = this.collection.dataModel.indexOfRowKey(rowKey);\n                this.trigger('valueChange', rowIndex);\n            }\n        }\n    },\n\n    /**\n     * Returns whether the 'set' method should be called silently.\n     * @param {Object} cellData - cell data\n     * @param {Boolean} valueChanged - true if value changed\n     * @returns {Boolean}\n     * @private\n     */\n    _shouldSetSilently: function(cellData, valueChanged) {\n        var valueChangedOnEditing = cellData.isEditing &amp;&amp; valueChanged;\n        var useViewMode = tui.util.pick(cellData, 'columnModel', 'editOption', 'useViewMode') !== false;\n        var editingStarted = _.contains(cellData.changed, 'isEditing') &amp;&amp; cellData.isEditing;\n\n        return valueChangedOnEditing || (useViewMode &amp;&amp; editingStarted);\n    }\n});\n\nmodule.exports = Row;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"