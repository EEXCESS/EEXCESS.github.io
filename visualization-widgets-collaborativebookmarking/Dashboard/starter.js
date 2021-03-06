

var EEXCESS = EEXCESS || {};




var globals = {
    origin: {clientType: '', clientVersion: '', userID: '', module: 'RecDashboard'}
};



var visTemplate = new Visualization(EEXCESS);


var vizRecConnector = null;
if (typeof USE_VIZREC !== "undefined" && USE_VIZREC === true) {
    vizRecConnector = new VizRecConnector();
    visTemplate.init();
}
else    // Only call init() on common start. With VizRec it gets called after its results arrived
    visTemplate.init();
var STARTER = {};

var onDataReceived = function (dataReceived, status) {
    //console.log("ONDATA RECEIVED", dataReceived, status);
    visTemplate.clearCanvasAndShowLoading();

    if (status == "no data available") {
        visTemplate.refresh();
        return;
    }
    
    globals["mappingcombination"] = getMappings();//dataReceived[0].mapping;
    globals["query"] = dataReceived.query;
    globals["profile"] = dataReceived.profile; // eg: profile.contextKeywords
    globals["queryID"] = dataReceived.queryID;
    globals["charts"] = getCharts(globals.mappingcombination);
    globals["data"] = dataReceived.result;
    
    if (determineDataFormatVersion(dataReceived.result) == "v2") {
        STARTER.loadEexcessDetails(dataReceived.result, dataReceived.queryID, function (mergedData) {
            globals["data"] = STARTER.mapRecommenderV2toV1(mergedData);
            //console.log("MAPPED GLOBAL DATA: " + globals.data);
            STARTER.sanitizeFacetValues(globals["data"]);
            saveReceivedData(dataReceived);
            STARTER.extractAndMergeKeywords(globals["data"]);
            visTemplate.clearCanvasAndHideLoading();
            visTemplate.refresh(globals);
            LoggingHandler.log({action: "New data received", itemCount: (globals["data"] || []).length});
        });
    } else {
        STARTER.sanitizeFacetValues(globals["data"]);
        saveReceivedData(dataReceived);
        STARTER.extractAndMergeKeywords(globals["data"]);
        visTemplate.clearCanvasAndHideLoading();
        visTemplate.refresh(globals);
        LoggingHandler.log({action: "New data received", itemCount: (globals["data"] || []).length});
    }


};

BOOKMARKDIALOG.FILTER.on_data_received_fct = onDataReceived;


// request data from Plugin
requestPlugin();


function saveReceivedData(received_data) {
    //Using globals["data"] to get mapped data for old (with "facets") structure
    var query_store = {
        data: {
            profile: received_data.profile,
            result: globals["data"]
        }
    };
    queryDb.saveQueryResults(query_store);
}

function requestPlugin() {

    var requestVisualization = function (pluginResponse) {
        if ((typeof pluginResponse == "undefined") || pluginResponse.result == null) {

            /*  TO USE DUMMY DATA UNCOMMENT THE NEXT 2 LINES AND COMMENT THE NEXT ONE*/
            var dummy = new Dummy();
            onDataReceived(dummy.data.data, "No data received. Using dummy data");

            //onDataReceived([], "no data available");
        } else {
            onDataReceived(deletedRdf(pluginResponse), "Data requested successfully");
            /*      CALL TO EEXCESS/Belgin SERVER
             var dataToSend = deletedRdf(pluginResponse);
             var host = "http://eexcess.know-center.tugraz.at/";
             var cmd = "getMappings";
             
             // Call server
             var post = $.post(host + "/viz", { cmd: cmd, dataset: JSON.stringify(dataToSend) });
             
             post
             .done(function(reqData){
             var data = JSON.parse(reqData);
             //console.log(JSON.stringify(data));
             onDataReceived(data, "Post to EEXCESS/Belgin server status: success");
             })
             .fail(function(){
             var dummy = new Dummy();
             globals.keywords = dummy.keywords;
             onDataReceived(dummy.data, "Post to EEXCESS/Belgin server status: fail");
             });
             */
        }
    };
    
    // Used for VizRec. If visTemplate is not initialized yet, but 
    var cached_data_before_init = null;
    
    window.onmessage = function (e) {
        if (e.data.event) {
            if (e.data.event === 'eexcess.newResults') {
           
                if (globals.queryID && e.data.data.queryID == globals.queryID) {
                    console.log('Same query results received ...');
                    return;
                }
                //showResults(e.data.data);
                console.log('New data received ...');
                
                
                if (vizRecConnector) {
                    vizRecConnector.setQuery(e.data.data.queryID);
                    vizRecConnector.loadMappingsAndChangeVis(e.data.data);
                }
                
                if (visTemplate.is_initialized){     //Due to VizRec init() may be called later
                    requestVisualization(e.data.data);
                    cached_data_before_init = e.data.data;
                }
                else                                // If not initialized, we save data in a variable
                   cached_data_before_init = e.data.data;
            } else if (e.data.event === 'eexcess.queryTriggered') {
                
            } 
             else if (e.data.event === 'eexcess.initVisTemplate') {
                
                
                if (cached_data_before_init) {
                 // console.log("data type before init Vis Template", determineDataFormatVersion(cached_data_before_init.result));
                 if (determineDataFormatVersion(cached_data_before_init.result) === "v2")
                     cached_data_before_init.result = STARTER.mapRecommenderV2toV1(cached_data_before_init.result);
                }

                /*
                 * This event is used by the VizRec.
                 * Initialization after data from VizRec-Server arrived
                 */
                
                if (!visTemplate.is_initialized)
                    visTemplate.init();                         
                // Use the cached data from the newResults event before
                requestVisualization(cached_data_before_init);
                visTemplate.refresh(globals);
                cached_data_before_init = null;

            } else if (e.data.event === 'eexcess.error') {
                //_showError(e.data.data);
            } else if (e.data.event === 'eexcess.rating') {
                //_rating($('.eexcess_raty[data-uri="' + e.data.data.uri + '"]'), e.data.data.uri, e.data.data.score);
            } else if (e.data.event === 'eexcess.newDashboardSettings') {
                visTemplate.updateSettings(e.data.settings);
                if (e.data.settings.origin != undefined) {
                    $.extend(globals.origin, e.data.settings.origin);
                }
            }
            
            
        }
    };

//     // Set listener to receive new data when a new query is triggered
//     EEXCESS.messaging.listener(
//         function(request, sender, sendResponse) {
// 
//             console.log(request.method);
//             if (request.method === 'newSearchTriggered') {
//                 console.log('data received from plugin');
//                 requestVisualization(request.data);
//             }
//         }
//     );
// 
// 
//     // Retrieve current recommendations data
//     EEXCESS.messaging.callBG({method: {parent: 'model', func: 'getResults'},data: null}, function(reqResult) {
//         console.log("first call for results");
//         console.log(reqResult);
//         requestVisualization(reqResult);
//     });

}



/**
 * ************************************************************************************************************************************************
 */

function determineDataFormatVersion(data) {
    if (data == null || data.length == 0)
        return null;

    if (data[0].documentBadge)
        return "v2";

    return "v1";
}

STARTER.sanitizeFacetValues = function (data) {
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var oldYear = dataItem.facets["year"];
        dataItem['facets']['year'] = parseDate(getCorrectedYear(dataItem.facets["year"])).getFullYear();
        if (oldYear == 'unknown' || oldYear == 'unkown')
            dataItem.facets["year"] = "unknown";
        //console.log('datumsumwandlung: ' + oldYear + ' --> ' + dataItem.facets["year"]);

        // Preven mixing up e.g "IMAGE" and "image"
        dataItem.facets['type'] = dataItem.facets["type"].toLowerCase();

    }
};

var sanitizeFacetValues = STARTER.sanitizeFacetValues;

STARTER.mapRecommenderV2toV1 = function (v2data) {
    // V1 Format:
    // {
    //     "id": "/09213/EUS_215E6E9754504544B88CEC4C120A18F8",
    //     "title": "Prague's water towersPražské vodní věže",
    //     "previewImage": "http://europeanastatic.eu",
    //     "uri": "http://europeana.eu/resolve/record/09213/EUS_215E6E9754504544B88CEC4C120A18F8",
    //     "eexcessURI": "http://europeana.eu/api/405rd",
    //     "collectionName": "09213_Ag_EU_EUscreen_Czech_Televison",
    //     "facets": {
    //         "provider": "Europeana",
    //         "type": "unkown",
    //         "language": "cs",
    //         "year": "2001",
    //         "license": "http://www.europeana.eu/rights/rr-f/"
    //     },
    //     "bookmarked": false,
    //     "provider-icon": "media/icons/Europeana-favicon.ico",
    //     "coordinate": [
    //         50.0596696,
    //         14.4656239
    //     ]
    // }

    // V2 Overview-Format: 
    // {
    //     "resultGroup": [
    //         {
    //             "resultGroup": [],
    //             "documentBadge": {
    //                 "id": "10010306208",
    //                 "uri": "http://www.econbiz.de/Record/10010306208",
    //                 "provider": "ZBW"
    //             },
    //             "mediaType": "unknown",
    //             "title": "Institutional change of the agricultural administration and rural associations in East Germany before and after unification",
    //             "description": "Der Zusammenbruch des sozialistischenng.",
    //             "date": "2011",
    //             "language": "de",
    //             "licence": "restricted"
    //         }
    //     ],
    //     "documentBadge": {
    //         "id": "10009278214",
    //         "uri": "http://www.econbiz.de/Record/10009278214",
    //         "provider": "ZBW"
    //     },
    //     "mediaType": "unknown",
    //     "title": "Institutional change of the agricultural administration and rural associations in East Germany before and after unification",
    //     "description": "Der Zusammenbruch des sozialistischen Regimes Ende 1989 sowie der immer ...Ostdeutschland während der ersten Jahre nach der Vereinigung.",
    //     "date": "2011",
    //     "language": "de",
    //     "licence": "restricted"
    // }

    // V2 Details:
    // {
    //     "eexcessProxy": {
    //         "edmlanguage": {
    //             "xmlnsedm": "http://www.europeana.eu/schemas/edm/",
    //             "content": "fr"
    //         },
    //         "dctitle": {
    //             "content": 1998,
    //             "xmlnsdc": "http://purl.org/dc/elements/1.1/"
    //         },
    //         "edmeuropeanaProxy": {
    //             "xmlnsedm": "http://www.europeana.eu/schemas/edm/",
    //             "content": false
    //         },
    //         "edmconcept": [
    //             {
    //                 "xmlnsedm": "http://www.europeana.eu/schemas/edm/",
    //                 "content": "film"
    //             },
    //             {
    //                 "xmlnsedm": "http://www.europeana.eu/schemas/edm/",
    //                 "content": "documentary film"
    //             }
    //         ],
    //         "xmlnseexcess": "http://eexcess.eu/schema/",
    //         "dcidentifier": {
    //             "content": "/04802/0C20B49D6C149705C27D255DC5666F27E46FE377",
    //             "xmlnsdc": "http://purl.org/dc/elements/1.1/"
    //         }
    //     }
    // }


    var v1data = [];
    for (var i = 0; i < v2data.length; i++) {

        var v2DataItem = v2data[i];
        // Moved code for converting a single element from V2 to V1
        var v1DataItem = BOOKMARKDIALOG.Tools.mapItemFromV2toV1(v2DataItem);

        v1data.push(v1DataItem);
    }

    return v1data;
};

STARTER.loadEexcessDetails = function (data, queryId, callback) {
    // Detail Call:
    // {
    //     "documentBadge": [
    //         {
    //             "id": "E1.6882",
    //             "uri": "http://www.kim.bl.openinteractive.ch/sammlungen#f19e71ca-4dc6-48b8-858c-60a1710066f0",
    //             "provider": "KIM.Portal"
    //         }
    // }

    //var detailCallBadges = underscore.map(data, 'documentBadge'); // trying to get rid of the "_" is not defined bug...
    var detailCallBadges = [];
    for (var i = 0; i < data.length; i++) {
        detailCallBadges.push(data[i].documentBadge);
    }

    var detailscall = $.ajax({
        //url: 'https://eexcess-dev.joanneum.at/eexcess-privacy-proxy-1.0-SNAPSHOT/api/v1/getDetails', // = old dev
        //url: 'https://eexcess-dev.joanneum.at/eexcess-privacy-proxy-issuer-1.0-SNAPSHOT/issuer/getDetails', // = dev
        url: 'https://eexcess.joanneum.at/eexcess-privacy-proxy-issuer-1.0-SNAPSHOT/issuer/getDetails', // = stable
        data: JSON.stringify({
            "documentBadge": detailCallBadges,
            "origin": globals.origin,
            "queryID": queryId || ''
        }),
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json'
    });
    detailscall.done(function (detailData) {
        var mergedData = STARTER.mergeOverviewAndDetailData(detailData, data);
        callback(mergedData);
    });
    detailscall.fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Error while calling details');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (textStatus !== 'abort') {
            console.error(textStatus);
        }
    });
};

STARTER.mergeOverviewAndDetailData = function (detailData, data) {
    //console.log("Data / Detail Data:");
    //console.log(data);
    //console.log(detailData);
    for (var i = 0; i < detailData.documentBadge.length; i++) {
        var detailDataItem = detailData.documentBadge[i];
        //var details = JSON.parse(detailDataItem.detail);
        var originalItem = underscore.find(data, function (dataItem) {
            return dataItem.documentBadge.id == detailDataItem.id;
        });
        originalItem.details = detailDataItem.detail;
    }

    return data;
};


function deletedRdf(pluginResponse) {

    pluginResponse.result.forEach(function (d) {
        delete d.rdf;
    });

    return pluginResponse;
}


function getCharts(combinations) {

    var charts = [];
    /*  FORMAT OF MAPPING COMBINATIONS RETRIEVED FROM EEXCESS/Belgin
     combinations.forEach(function(mc){
     if(charts.indexOf(mc.chartname) == -1)
     charts.push(mc.chartname);
     });
     */

    combinations.forEach(function (c) {
        charts.push(c.chart);
    });

    return charts;
}


function getMappings() {

    var mappings = [
        {
            "chart": "timeline",
            "combinations": [
                [
                    {"facet": "year", "visualattribute": "x-axis"},
                    {"facet": "provider", "visualattribute": "y-axis"},
                    {"facet": "language", "visualattribute": "color"}
                ],
                [
                    {"facet": "year", "visualattribute": "x-axis"},
                    {"facet": "language", "visualattribute": "y-axis"},
                    {"facet": "provider", "visualattribute": "color"}
                ]
            ]
        },
        {
            "chart": "barchart",
            "combinations": [
                [
                    {"facet": "language", "visualattribute": "x-axis"},
                    {"facet": "count", "visualattribute": "y-axis"},
                    {"facet": "language", "visualattribute": "color"}
                ],
                [
                    {"facet": "provider", "visualattribute": "x-axis"},
                    {"facet": "count", "visualattribute": "y-axis"},
                    {"facet": "provider", "visualattribute": "color"}
                ]
            ]
        },
        {
            "chart": "geochart",
            "combinations": [
                [
                    {"facet": "language", "visualattribute": "color"}
                ],
                [
                    {"facet": "provider", "visualattribute": "color"}
                ]
            ]
        },
        {
            "chart": "urank",
            "combinations": [
                [
                    {"facet": "language", "visualattribute": "color"}
                ],
                [
                    {"facet": "provider", "visualattribute": "color"}
                ]
            ]
        },
        {
            "chart": "landscape",
            "combinations": [
                [
                    {"facet": "language", "visualattribute": "color"}
                ],
                [
                    {"facet": "provider", "visualattribute": "color"}
                ]
            ]
        }
    ];

    for (var i = 0; i < visTemplate.plugins.length; i++) {
        var plugin = visTemplate.plugins[i];
        mappings.push({
            "chart": plugin.displayName,
            "combinations": plugin.mappingCombinations
        });
    }

    return mappings;

}



function getDemoResultsUniversity() {

    var demoDataReceived = {
        result: demoDataUniversity,
        query: "University Campus"
    };
    return demoDataReceived;
}
BOOKMARKDIALOG.FILTER.get_demo_results_university_fct = getDemoResultsUniversity;

function getDemoResultsHistoricBuildings() {

    var demoDataReceived = {
        result: demoDataHistoricalBuildings,
        query: "Historical Buildings"
    };
    return demoDataReceived;
}
BOOKMARKDIALOG.FILTER.get_demo_results_historic_buildings = getDemoResultsHistoricBuildings;


STARTER.extractAndMergeKeywords = function (data) {

    window.TAG_CATEGORIES = 5;

    //  String Constants
    window.STR_NO_VIS = "No visualization yet!";
    window.STR_DROPPED = "Dropped!";
    window.STR_DROP_TAGS_HERE = "Drop tags here!";
    window.STR_JUST_RANKED = "new";
    window.STR_SEARCHING = "Searching...";
    window.STR_UNDEFINED = 'undefined';


    var keywordExtractorOptions = {
        minDocFrequency: 1,
        minRepetitionsInDocument: 2,
        maxKeywordDistance: 2,
        minRepetitionsProxKeywords: 2,
        multiLingualEnabled: true
    };
    var multiLingualService = new natural.MultiLingualService;
    var keywordExtractor = new KeywordExtractor(keywordExtractorOptions);
    var indexCounter = 0;
    data.forEach(function (d, i) {
        d.index = i;
        if (d.description == null || d.description == 'undefined') {
            d.description = "";
        }
        d.title = d.title.clean();
        d.description = d.description.clean();
        var document = (d.description) ? d.title + '. ' + d.description : d.title;
        d.facets.language = d.facets.language ? d.facets.language : "en"
        d.facets.languageOrig = d.facets.language;
        d.facets.language = multiLingualService.getTextLanguage(d.text, d.facets.language);
        keywordExtractor.addDocument(document.removeUnnecessaryChars(), d.id, d.facets.language);
    });

    //  Extract collection and document keywords
    try {
        keywordExtractor.processCollection();
    } catch (error) {
        console.error("keyword extraction had an error.");
    }

    data.forEach(function (d, i) {
        d.keywords = keywordExtractor.listDocumentKeywords(i);
    });

    data.keywords = keywordExtractor.getCollectionKeywords();
    data.keywordsDict = keywordExtractor.getCollectionKeywordsDictionary();
};
