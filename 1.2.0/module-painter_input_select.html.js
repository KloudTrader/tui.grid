tui.util.defineNamespace("fedoc.content", {});
fedoc.content["module-painter_input_select.html"] = "<div id=\"main\" class=\"main\">\n\n\n\n\n<section>\n\n<header>\n    \n        \n            \n        \n            \n                <h2>painter/input/select</h2>\n            \n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Painter class for 'select' input.</p></div>\n        \n\n        \n            \n<div class=\"\">\n<dt>\n    \n        <h4 class=\"name\" id=\"module:painter/input/select\">\n            <span class=\"type-signature\"></span>new (require(\"painter/input/select\"))<span class=\"signature\">()</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 19</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"\">\n<dt>\n    \n</dt>\n<dd>\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n    \n    </div>\n    \n\n    \n        <h3 class=\"subsection-title\">Extends</h3>\n        \n<dl>\n    <dt><h4 class=\"name\">\n        module:painter/input/base\n        <div class=\"container-source members\">\n            <code><a href=\"module-painter_input_base.html\">module:painter/input/base</a></code>\n        </div>\n    <h4></dt>\n</dl>\n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n    <div class=\"container-members\">\n        <h3 class=\"subsection-title\">Members</h3>\n\n        <dl>\n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"optionTemplate\">\n        <span class=\"type-signature\"></span>optionTemplate<span class=\"type-signature\"></span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 41</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n    <div class=\"description\">\n        <p>Options markup template</p>\n    </div>\n    \n\n    <!--\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"selector\">\n        <span class=\"type-signature\"></span>selector<span class=\"type-signature\"> :String</span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 26</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n    <div class=\"description\">\n        <p>css selector to use delegated event handlers by '$.on()' method.</p>\n    </div>\n    \n\n    <!--\n    \n        <h5>Type:</h5>\n        <ul>\n            <li>\n                \n<span class=\"param-type\">String</span>\n\n\n            </li>\n        </ul>\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    <h4 class=\"name\" id=\"template\">\n        <span class=\"type-signature\"></span>template<span class=\"type-signature\"></span>\n        \n        <div class=\"container-source members\">\n            <code>file</code>,\n            <code>line 33</code>\n        </div>\n        \n    </h4>\n\n    \n</dt>\n<dd>\n    \n    <div class=\"description\">\n        <p>Content markup template</p>\n    </div>\n    \n\n    <!--\n    \n    -->\n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n</dd>\n</div>\n\n        </dl>\n    </div>\n    \n\n    \n    <div class=\"container-methods\">\n        <h3 class=\"subsection-title\">Methods</h3>\n\n        <dl>\n            \n<div class=\"tui-hidden\">\n<dt>\n    \n        <h4 class=\"name\" id=\"_generateInputHtml\">\n            <span class=\"type-signature\"><span class=\"icon green\">protected</span> </span>_generateInputHtml<span class=\"signature\">(cellData)</span><span class=\"type-signature\"> &rarr; {string}</span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 67</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>Generates an input HTML string from given data, and returns it.</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>cellData</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">object</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>cell data</p></td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n    <div class=\"container-returns\">\n        <div class=\"returns\">\n        <h5>Returns:</h5>\n        <div class=\"details\">\n        \n                \n    \n<span class=\"param-type\">string</span>\n\n\n\n            \n        </div>\n        </div>\n    </div>\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n    <dt class=\"implements\">Implements:</dt>\n    <dd class=\"implements\"><ul>\n        \n            <li><a href=\"module-painter_input_base.html\">module:painter/input/base</a></li>\n        \n    </ul></dd>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    \n        <h4 class=\"name\" id=\"_getDisplayValue\">\n            <span class=\"type-signature\"><span class=\"icon green\">protected</span> </span>_getDisplayValue<span class=\"signature\">(cellData)</span><span class=\"type-signature\"> &rarr; {String}</span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 52</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>Returns the value string of given data to display in the cell.</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>cellData</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">Object</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>cell data</p></td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n    <div class=\"container-returns\">\n        <div class=\"returns\">\n        <h5>Returns:</h5>\n        <div class=\"details\">\n        \n                \n    \n<span class=\"param-type\">String</span>\n\n\n\n            \n        </div>\n        </div>\n    </div>\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n    <dt class=\"implements\">Implements:</dt>\n    <dd class=\"implements\"><ul>\n        \n            <li><a href=\"module-painter_input_base.html\">module:painter/input/base</a></li>\n        \n    </ul></dd>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        </dl>\n    </div>\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n</div>"