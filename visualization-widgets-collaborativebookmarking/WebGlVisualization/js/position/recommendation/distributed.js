
IQHN = IQHN || {};


/**
 * 
 * @param {IQHN.Collection} collection
 * @returns {undefined}
 */
IQHN.RecommendationPosDistributed = function (collection) {

    /** @type{IQHN.Collection} **/
    this.collection_ = collection;
};

/**
 * Distributing the recommendations around the collection
 */
IQHN.RecommendationPosDistributed.prototype.calculatePositions = function () {

    var recommendations = this.collection_.getRecommendations();


    var num_res = recommendations.length;

    var degree_step = (Math.PI * 2) / num_res;
    var curr_rad = -Math.PI / 2.0;

    for (var i = 0; i < recommendations.length; i++) {
        /** @type{IQHN.Recommendation} **/

        curr_rad += degree_step;

        //Normalization 
        while (curr_rad < 0)
            curr_rad += (Math.PI * 2);

        while (curr_rad > Math.PI * 2)
            curr_rad -= Math.PI * 2;

        var curr_rec = recommendations[i];
        
        
        
        curr_rec.setRelativePositionByRad(null, curr_rad);
    }

};
