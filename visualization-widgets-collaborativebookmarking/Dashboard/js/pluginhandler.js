var PluginHandler = {
    vis: null,
    visPlugins: [],
    filterPlugins: [],
    visRootSelector: null,
    filterRootSelector: null,
    pluginScripts: [],
    isInitialized: false,
    defaultCombinations: [
        [
            { "facet": "language", "visualattribute": "x-axis" },
            { "facet": "count", "visualattribute": "y-axis" },
            { "facet": "language", "visualattribute": "color" }
        ],
        [
            { "facet": "provider", "visualattribute": "x-axis" },
            { "facet": "count", "visualattribute": "y-axis" },
            { "facet": "provider", "visualattribute": "color" }
        ]
    ],

    initialize: function (vis, visRootSelector, filterRootSelector) {
        PluginHandler.vis = vis;
        PluginHandler.visRootSelector = visRootSelector;
        PluginHandler.filterRootSelector = filterRootSelector;
        PluginHandler.isInitialized = true;

        PluginHandler.registerPluginScripts(PluginHandler.pluginScripts);
    },

    getPlugins: function () {
        return PluginHandler.visPlugins;
    },

    registerVisualisation: function (pluginObject, configuration) {

        if (!configuration.mappingCombinations) {
            configuration.mappingCombinations = PluginHandler.defaultCombinations;
        }

        configuration.Object = pluginObject;
        if (configuration.Object.initialize != undefined)
            configuration.Object.initialize(PluginHandler.vis, PluginHandler.visRootSelector);
        PluginHandler.visPlugins.push(configuration);
        PluginHandler.vis.refreshChartSelect(); // todo: call not before all plugins are loaded
    },

    registerFilterVisualisation: function (pluginObject, configuration) {
        configuration.Object = pluginObject;
        PluginHandler.filterPlugins.push(configuration);
    },

    getFilterPluginForType: function (type, preferTextualViz) {
        var filters = underscore.filter(PluginHandler.filterPlugins, {type: type});
        if (filters.length == 0)
            return null;
            
        if (filters.length > 1) // use preferTextualViz only, if textual and non textual filter was found for this type
            filters = underscore.filter(filters, function(f){ return preferTextualViz ? f.isTextual : !f.isTextual; });

        return filters[0]; 
    },

    registerPluginScripts: function (pluginScripts) {
        for (var i = 0; i < pluginScripts.length; i++) {
            if (PluginHandler.isInitialized) {
                PluginHandler.loadScript(pluginScripts[i]);
            } else {
                PluginHandler.pluginScripts.push(pluginScripts[i]);
            }
        }
    },

    loadScript: function (scriptName, callback) {
        var scriptEl = document.createElement('script');
        //scriptEl.src = chrome.extension.getURL('visualizations/Vis-Template/Plugins/' + scriptName + '');
        scriptEl.src = 'Plugins/' + scriptName + '';
        scriptEl.addEventListener('load', callback, false);
        document.head.appendChild(scriptEl);
    },

    getByDisplayName: function (displayName) {
        for (var i = 0; i < PluginHandler.visPlugins.length; i++) {
            var plugin = PluginHandler.visPlugins[i];
            if (plugin.displayName == displayName) {
                return plugin;
            }
        }
        return null;
    }
};