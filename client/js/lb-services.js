(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.AdminTools
 * @header lbServices.AdminTools
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AdminTools` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "AdminTools",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/AdminTools/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.AdminTools#ajaxData
         * @methodOf lbServices.AdminTools
         *
         * @description
         *
         * For debugging
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `types` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "ajaxData": {
          url: urlBase + "/AdminTools/ajaxData",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AdminTools#getSearchLog
         * @methodOf lbServices.AdminTools
         *
         * @description
         *
         * For debugging
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `reference_code` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * searchLogInstance
         */
        "getSearchLog": {
          url: urlBase + "/AdminTools/getSearchLog",
          method: "POST"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.AdminTools#modelName
    * @propertyOf lbServices.AdminTools
    * @description
    * The name of the model represented by this $resource,
    * i.e. `AdminTools`.
    */
    R.modelName = "AdminTools";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Missions
 * @header lbServices.Missions
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Missions` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Missions",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/missions/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Missions#create
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/missions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#createMany
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/missions",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#upsert
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/missions",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#exists
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/missions/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#findById
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/missions/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#find
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/missions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#findOne
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/missions/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#updateAll
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/missions/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#deleteById
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/missions/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#count
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/missions/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#prototype$updateAttributes
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/missions/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#createChangeStream
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/missions/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#getMyMissions
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Get available missions and progress. Initialize a valid mission-progress if not exist .
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "getMyMissions": {
          url: urlBase + "/missions/myMissions",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#emulateMissionTrigger
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Some description of this remote Method.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `trigger` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "emulateMissionTrigger": {
          url: urlBase + "/missions/emulateMissionTrigger",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Missions#getMyMissionRecords
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Get available missions and progress. Initialize a valid mission-progress if not exist .
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "getMyMissionRecords": {
          url: urlBase + "/missions/myMissionRecords",
          method: "POST"
        },

        // INTERNAL. Use Mission_progress.mission() instead.
        "::get::mission_progress::mission": {
          url: urlBase + "/mission_progresses/:id/mission",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Missions#updateOrCreate
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Missions#update
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Missions#destroyById
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Missions#removeById
         * @methodOf lbServices.Missions
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Missions#modelName
    * @propertyOf lbServices.Missions
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Missions`.
    */
    R.modelName = "Missions";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Member
 * @header lbServices.Member
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Member` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Member",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/member/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Member.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/member/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#create
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/member",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#createMany
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/member",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#upsert
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/member",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#exists
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/member/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#findById
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/member/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#find
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/member",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#findOne
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/member/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#updateAll
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/member/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#deleteById
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/member/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#count
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/member/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#prototype$updateAttributes
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/member/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#createChangeStream
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/member/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#genVerificationCode
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Generate verification code and send through SMS.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `country_code` – `{string}` - Country code.
         *
         *  - `tel` – `{string}` - Phone Number.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "genVerificationCode": {
          url: urlBase + "/member/genVerificationCode",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#verifyVerificationCode
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Verify the verification entered by client.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `country_code` – `{string}` - Country code.
         *
         *  - `tel` – `{string}` - Phone Number.
         *
         *  - `verification` – `{string}` - Verification code.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "verifyVerificationCode": {
          url: urlBase + "/member/verifyVerificationCode",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#getStatus
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Get the status information of the passenger.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `id` – `{string}` - Passenger id.
         *
         *  - `user_token` – `{string}` - Passenger user_token. (deprecating)
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "getStatus": {
          url: urlBase + "/member/getStatus",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#login
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Get the status information of the passenger by userToken.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `user_token` – `{string}` - Passenger user_token. (deprecating)
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "login": {
          url: urlBase + "/member/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#setInfo
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Set additional passenger information after telephone number verified.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `id` – `{string}` - Passenger id.
         *
         *  - `user_token` – `{string}` - Passenger user_token. (deprecating)
         *
         *  - `device_id` – `{string}` - Passenger device_id.
         *
         *  - `family_name` – `{string=}` - Passenger name.
         *
         *  - `given_name` – `{string=}` - Passenger name.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "setInfo": {
          url: urlBase + "/member/setInfo",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#updateCurrentLocation
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Set additional passenger information after telephone number verified.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `id` – `{string}` - Passenger id.
         *
         *  - `loc_x` – `{string}` - Passenger user_token.
         *
         *  - `loc_y` – `{string}` - Passenger device_id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "updateCurrentLocation": {
          url: urlBase + "/member/updateCurrentLocation",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#getMyOrderRecords
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Set additional passenger information after telephone number verified.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `passenger_id` – `{string}` - Passenger id.
         *
         *  - `where` – `{string=}` - Where object JSON stringified [reference](https://docs.strongloop.com/display/public/LB/Where+filter).
         *
         *  - `limit` – `{string=}` - Limit on number of results returned, default 20
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "getMyOrderRecords": {
          url: urlBase + "/member/getMyOrderRecords",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Member#getMyDriverDistance
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Get distance and estimate time for driver to come.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "getMyDriverDistance": {
          url: urlBase + "/member/getMyDriverDistance",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Member#updateOrCreate
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Member` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Member#update
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Member#destroyById
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Member#removeById
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Member#modelName
    * @propertyOf lbServices.Member
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Member`.
    */
    R.modelName = "Member";


        /**
         * @ngdoc method
         * @name lbServices.Member#user
         * @methodOf lbServices.Member
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("TaxiGoUsers");
          var action = TargetResource["::get::member::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.OrderDistributor
 * @header lbServices.OrderDistributor
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `OrderDistributor` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "OrderDistributor",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/OrderDistributor/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.OrderDistributor#aquireOrders
         * @methodOf lbServices.OrderDistributor
         *
         * @description
         *
         * Aquire orders from server.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - Order id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "aquireOrders": {
          url: urlBase + "/OrderDistributor/aquireOrders",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrderDistributor#assign
         * @methodOf lbServices.OrderDistributor
         *
         * @description
         *
         * Assign an order to driver.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `orderId` – `{string}` - Order id.
         *
         *  - `driverId` – `{string}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "assign": {
          url: urlBase + "/OrderDistributor/assign",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrderDistributor#hardAssign
         * @methodOf lbServices.OrderDistributor
         *
         * @description
         *
         * Force assign an order to driver (kick into status 2).
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `order_id` – `{string}` - Order id.
         *
         *  - `driver_id` – `{string}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "hardAssign": {
          url: urlBase + "/OrderDistributor/hardAssign",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrderDistributor#takeOrder
         * @methodOf lbServices.OrderDistributor
         *
         * @description
         *
         * Force assign an order to driver (kick into status 2).**Required Driver Login**
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `orderId` – `{string}` - Order id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "takeOrder": {
          url: urlBase + "/OrderDistributor/takeOrder",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrderDistributor#rejectOrder
         * @methodOf lbServices.OrderDistributor
         *
         * @description
         *
         * Rejecting an order. Get off status 2 if assigned an order. **Required Driver Login**
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "rejectOrder": {
          url: urlBase + "/OrderDistributor/rejectOrder",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.OrderDistributor#getOrders
         * @methodOf lbServices.OrderDistributor
         *
         * @description
         *
         * get current assigned orders
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "getOrders": {
          url: urlBase + "/OrderDistributor/getOrders",
          method: "POST"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.OrderDistributor#modelName
    * @propertyOf lbServices.OrderDistributor
    * @description
    * The name of the model represented by this $resource,
    * i.e. `OrderDistributor`.
    */
    R.modelName = "OrderDistributor";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Driver
 * @header lbServices.Driver
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Driver` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Driver",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/driver/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Driver.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/driver/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#create
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/driver",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#createMany
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/driver",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#upsert
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/driver",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#exists
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/driver/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#findById
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/driver/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#find
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/driver",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#findOne
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/driver/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#updateAll
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/driver/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#deleteById
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/driver/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#count
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/driver/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#prototype$updateAttributes
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/driver/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#createChangeStream
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/driver/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#genVerificationCode
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Generate verification code and send through SMS.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `country_code` – `{string}` - Country code.
         *
         *  - `tel` – `{string}` - Phone Number.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "genVerificationCode": {
          url: urlBase + "/driver/genVerificationCode",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#verifyVerificationCode
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Verify the verification entered by client.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `country_code` – `{string}` - Country code.
         *
         *  - `tel` – `{string}` - Phone Number.
         *
         *  - `verification` – `{string}` - Verification code.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "verifyVerificationCode": {
          url: urlBase + "/driver/verifyVerificationCode",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#getDriverData
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Get the driver data.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `driver_id` – `{string}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "getDriverData": {
          url: urlBase + "/driver/getDriverData",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#getDriversInBoundry
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Get the driver within boundry.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `minX` – `{number}` - Left-bottom latitude.
         *
         *  - `minY` – `{number}` - Left-bottom longitude.
         *
         *  - `maxX` – `{number}` - Right-top latitude.
         *
         *  - `maxY` – `{number}` - Right-top longitude.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "getDriversInBoundry": {
          url: urlBase + "/driver/getDriversInBoundry",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#getStatus
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Get the driver status.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `id` – `{string}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "getStatus": {
          url: urlBase + "/driver/getStatus",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#setStatus
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update driver Status.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `id` – `{string}` - Driver id.
         *
         *  - `status` – `{string}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "setStatus": {
          url: urlBase + "/driver/setStatus",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#updateLocation
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update driver location.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `id` – `{string}` - Driver id.
         *
         *  - `loc_array` – `{string}` - loc_array string "lat,lng".
         *
         *  - `during` – `{string=}` - Taxi during ???.
         *
         *  - `direction` – `{string=}` - Taxi direction.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "updateLocation": {
          url: urlBase + "/driver/updateLocation",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Driver#getMyOrderRecords
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Set additional passenger information after telephone number verified.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `driver_id` – `{string}` - Driver id.
         *
         *  - `where` – `{string=}` - Where object JSON stringified [reference](https://docs.strongloop.com/display/public/LB/Where+filter).
         *
         *  - `limit` – `{string=}` - Limit on number of results returned, default 20
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "getMyOrderRecords": {
          url: urlBase + "/driver/getMyOrderRecords",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Driver#updateOrCreate
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Driver` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Driver#update
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Driver#destroyById
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Driver#removeById
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Driver#modelName
    * @propertyOf lbServices.Driver
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Driver`.
    */
    R.modelName = "Driver";


        /**
         * @ngdoc method
         * @name lbServices.Driver#user
         * @methodOf lbServices.Driver
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("TaxiGoUsers");
          var action = TargetResource["::get::driver::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Gifts
 * @header lbServices.Gifts
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Gifts` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Gifts",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/gifts/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Gifts#create
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/gifts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#createMany
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/gifts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#upsert
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/gifts",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#exists
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/gifts/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#findById
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/gifts/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#find
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/gifts",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#findOne
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/gifts/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#updateAll
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/gifts/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#deleteById
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/gifts/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#count
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/gifts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#prototype$updateAttributes
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/gifts/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#createChangeStream
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/gifts/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#getAvailableGifts
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Show available gifts. *Require login.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         *
         */
        "getAvailableGifts": {
          url: urlBase + "/gifts/getAvailableGifts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#getMyRedeemRecords
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Show redeem records. *Require login.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         *
         */
        "getMyRedeemRecords": {
          url: urlBase + "/gifts/getMyRedeemRecords",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gifts#redeem
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Method for claiming a gift *Require login.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `giftId` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         *
         */
        "redeem": {
          url: urlBase + "/gifts/redeem",
          method: "POST"
        },

        // INTERNAL. Use Gift_redeem.gift() instead.
        "::get::gift_redeem::gift": {
          url: urlBase + "/gift_redeems/:id/gift",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Gifts#updateOrCreate
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Gifts#update
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Gifts#destroyById
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Gifts#removeById
         * @methodOf lbServices.Gifts
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Gifts#modelName
    * @propertyOf lbServices.Gifts
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Gifts`.
    */
    R.modelName = "Gifts";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.History
 * @header lbServices.History
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `History` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "History",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/history/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.History#getSearchLogs
         * @methodOf lbServices.History
         *
         * @description
         *
         * Get the hotel location definition.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `uid` – `{string}` - User id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "getSearchLogs": {
          url: urlBase + "/history/searchLog",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#getHotel
         * @methodOf lbServices.History
         *
         * @description
         *
         * Get the hotel location definition.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "getHotel": {
          url: urlBase + "/history/getHotel",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#setCompany
         * @methodOf lbServices.History
         *
         * @description
         *
         * Get the driver data.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `passenger_id` – `{string}` - Passenger id.
         *
         *  - `place_id` – `{string}` - Place id.
         *
         *  - `first_desc` – `{string}` - Place id.
         *
         *  - `sec_desc` – `{string}` - Place id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "setCompany": {
          url: urlBase + "/history/setCompany",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#setHome
         * @methodOf lbServices.History
         *
         * @description
         *
         * Get the driver data.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `passenger_id` – `{string}` - Passenger id.
         *
         *  - `place_id` – `{string}` - Place id.
         *
         *  - `first_desc` – `{string}` - Place id.
         *
         *  - `sec_desc` – `{string}` - Place id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "setHome": {
          url: urlBase + "/history/setHome",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#setNormal
         * @methodOf lbServices.History
         *
         * @description
         *
         * Get the driver data.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `reference_code` – `{string=}` - Place referenceCode.
         *
         *  - `passenger_id` – `{string}` - Passenger id.
         *
         *  - `place_id` – `{string}` - Place id.
         *
         *  - `first_desc` – `{string}` - Place id.
         *
         *  - `sec_desc` – `{string}` - Place id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "setNormal": {
          url: urlBase + "/history/setNormal",
          method: "POST"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.History#modelName
    * @propertyOf lbServices.History
    * @description
    * The name of the model represented by this $resource,
    * i.e. `History`.
    */
    R.modelName = "History";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Order
 * @header lbServices.Order
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Order` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Order",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/order/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Order#getMyRecords
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Cancel Order.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "getMyRecords": {
          url: urlBase + "/order/myRecords",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#cancelOrder
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Cancel Order.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `order_id` – `{string}` - Passenger id.
         *
         *  - `driver_id` – `{string=}` - Driver id.
         *
         *  - `passenger_id` – `{string=}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "cancelOrder": {
          url: urlBase + "/order/cancelOrder",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#completeOrder
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Set Order as completed.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `order_id` – `{string}` - Passenger id.
         *
         *  - `driver_id` – `{string=}` - Driver id.
         *
         *  - `passenger_id` – `{string=}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "completeOrder": {
          url: urlBase + "/order/completeOrder",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#confirmOrder
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Confirm Order.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `order_id` – `{string}` - Order id.
         *
         *  - `driver_id` – `{string=}` - Driver id.
         *
         *  - `passenger_id` – `{string=}` - Passenger id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "confirmOrder": {
          url: urlBase + "/order/confirmOrder",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#distribute
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Assign order to a VIP driver.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `order_id` – `{string}` - Order id.
         *
         *  - `driver_id` – `{string}` - Driver id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "distribute": {
          url: urlBase + "/order/order_distribute",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#driverReply
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Handel driver's reply.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `order_id` – `{string}` - Order id.
         *
         *  - `driver_id` – `{string}` - Driver id.
         *
         *  - `reply` – `{string}` - Drivers reply Y/N.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "driverReply": {
          url: urlBase + "/order/driver_reply",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#setRating
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Set order rating.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `order_id` – `{string}` - Order id.
         *
         *  - `passenger_id` – `{string}` - Passenger id.
         *
         *  - `user_token` – `{string}` - Passenger token.
         *
         *  - `rating` – `{number}` - Integer 1~5 as rating.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "setRating": {
          url: urlBase + "/order/setRating",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Order#submitOrder
         * @methodOf lbServices.Order
         *
         * @description
         *
         * Update driver Status.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `passenger_id` – `{string}` - Passenger id.
         *
         *  - `start_reference_code` – `{string}` - Location reference code.
         *
         *  - `end_reference_code` – `{string}` - Location reference code.
         *
         *  - `memo` – `{string=}` - Driver id.
         *
         *  - `require_vip` – `{boolean=}` - If the order requires a VIP car.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Standard Response Object
         */
        "submitOrder": {
          url: urlBase + "/order/submit",
          method: "POST"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Order#modelName
    * @propertyOf lbServices.Order
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Order`.
    */
    R.modelName = "Order";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Location
 * @header lbServices.Location
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Location` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Location",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/location/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Location#autocomplete
         * @methodOf lbServices.Location
         *
         * @description
         *
         * Get the driver data.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `keyword` – `{string}` - Passenger id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Status code
         */
        "autocomplete": {
          url: urlBase + "/location/autocomplete",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Location#nearList
         * @methodOf lbServices.Location
         *
         * @description
         *
         * Get near place item data:[{googlePlace}].
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `location` – `{string}` - location X,Y .
         *
         *  - `radius` – `{string=}` - Radius .
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * TaxiGo Standard response object
         */
        "nearList": {
          url: urlBase + "/location/nearList",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Location#getDirection
         * @methodOf lbServices.Location
         *
         * @description
         *
         * Get near place item data:[{googlePlace}].
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object}` - request object
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Google Response object
         */
        "getDirection": {
          url: urlBase + "/location/getDirection",
          method: "POST"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Location#modelName
    * @propertyOf lbServices.Location
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Location`.
    */
    R.modelName = "Location";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.StandardResponse
 * @header lbServices.StandardResponse
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `StandardResponse` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "StandardResponse",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/standardResponses/:id",
      { 'id': '@id' },
      {
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.StandardResponse#modelName
    * @propertyOf lbServices.StandardResponse
    * @description
    * The name of the model represented by this $resource,
    * i.e. `StandardResponse`.
    */
    R.modelName = "StandardResponse";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.TaxiGoUsers
 * @header lbServices.TaxiGoUsers
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `TaxiGoUsers` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "TaxiGoUsers",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/taxiGoUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__findById__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__destroyById__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__updateById__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.findById() instead.
        "prototype$__findById__missionRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/missionRecords/:fk",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.destroyById() instead.
        "prototype$__destroyById__missionRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/missionRecords/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.updateById() instead.
        "prototype$__updateById__missionRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/missionRecords/:fk",
          method: "PUT"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.findById() instead.
        "prototype$__findById__redeemRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/:fk",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.destroyById() instead.
        "prototype$__destroyById__redeemRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.updateById() instead.
        "prototype$__updateById__redeemRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__get__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Queries accessTokens of taxiGoUsers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__create__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/taxiGoUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__delete__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/taxiGoUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$__count__accessTokens
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Counts accessTokens of taxiGoUsers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/taxiGoUsers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords() instead.
        "prototype$__get__missionRecords": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.create() instead.
        "prototype$__create__missionRecords": {
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.destroyAll() instead.
        "prototype$__delete__missionRecords": {
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.count() instead.
        "prototype$__count__missionRecords": {
          url: urlBase + "/taxiGoUsers/:id/missionRecords/count",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords() instead.
        "prototype$__get__redeemRecords": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.create() instead.
        "prototype$__create__redeemRecords": {
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.destroyAll() instead.
        "prototype$__delete__redeemRecords": {
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.count() instead.
        "prototype$__count__redeemRecords": {
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#create
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/taxiGoUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#createMany
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/taxiGoUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#upsert
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/taxiGoUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#exists
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/taxiGoUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#findById
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/taxiGoUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#find
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/taxiGoUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#findOne
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/taxiGoUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#updateAll
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/taxiGoUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#deleteById
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/taxiGoUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#count
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/taxiGoUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#prototype$updateAttributes
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/taxiGoUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#createChangeStream
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/taxiGoUsers/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#login
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/taxiGoUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#logout
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/taxiGoUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#confirm
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/taxiGoUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#resetPassword
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/taxiGoUsers/reset",
          method: "POST"
        },

        // INTERNAL. Use Member.user() instead.
        "::get::member::user": {
          url: urlBase + "/member/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Driver.user() instead.
        "::get::driver::user": {
          url: urlBase + "/driver/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Mission_progress.user() instead.
        "::get::mission_progress::user": {
          url: urlBase + "/mission_progresses/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Gift_redeem.user() instead.
        "::get::gift_redeem::user": {
          url: urlBase + "/gift_redeems/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#getCurrent
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/taxiGoUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#updateOrCreate
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#update
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#destroyById
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#removeById
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#getCachedCurrent
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.TaxiGoUsers#login} or
         * {@link lbServices.TaxiGoUsers#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A TaxiGoUsers instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#isAuthenticated
         * @methodOf lbServices.TaxiGoUsers
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#getCurrentId
         * @methodOf lbServices.TaxiGoUsers
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.TaxiGoUsers#modelName
    * @propertyOf lbServices.TaxiGoUsers
    * @description
    * The name of the model represented by this $resource,
    * i.e. `TaxiGoUsers`.
    */
    R.modelName = "TaxiGoUsers";

    /**
     * @ngdoc object
     * @name lbServices.TaxiGoUsers.missionRecords
     * @header lbServices.TaxiGoUsers.missionRecords
     * @object
     * @description
     *
     * The object `TaxiGoUsers.missionRecords` groups methods
     * manipulating `Mission_progress` instances related to `TaxiGoUsers`.
     *
     * Call {@link lbServices.TaxiGoUsers#missionRecords TaxiGoUsers.missionRecords()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#missionRecords
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Queries missionRecords of taxiGoUsers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        R.missionRecords = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::get::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#count
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Counts missionRecords of taxiGoUsers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.missionRecords.count = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::count::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#create
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Creates a new instance in missionRecords of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        R.missionRecords.create = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::create::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#createMany
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Creates a new instance in missionRecords of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        R.missionRecords.createMany = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::createMany::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#destroyAll
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Deletes all missionRecords of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.missionRecords.destroyAll = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::delete::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#destroyById
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Delete a related item by id for missionRecords.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for missionRecords
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.missionRecords.destroyById = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::destroyById::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#findById
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Find a related item by id for missionRecords.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for missionRecords
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        R.missionRecords.findById = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::findById::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.missionRecords#updateById
         * @methodOf lbServices.TaxiGoUsers.missionRecords
         *
         * @description
         *
         * Update a related item by id for missionRecords.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for missionRecords
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        R.missionRecords.updateById = function() {
          var TargetResource = $injector.get("Mission_progress");
          var action = TargetResource["::updateById::taxiGoUsers::missionRecords"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.TaxiGoUsers.redeemRecords
     * @header lbServices.TaxiGoUsers.redeemRecords
     * @object
     * @description
     *
     * The object `TaxiGoUsers.redeemRecords` groups methods
     * manipulating `Gift_redeem` instances related to `TaxiGoUsers`.
     *
     * Call {@link lbServices.TaxiGoUsers#redeemRecords TaxiGoUsers.redeemRecords()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers#redeemRecords
         * @methodOf lbServices.TaxiGoUsers
         *
         * @description
         *
         * Queries redeemRecords of taxiGoUsers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R.redeemRecords = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::get::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#count
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Counts redeemRecords of taxiGoUsers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.redeemRecords.count = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::count::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#create
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Creates a new instance in redeemRecords of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R.redeemRecords.create = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::create::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#createMany
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Creates a new instance in redeemRecords of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R.redeemRecords.createMany = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::createMany::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#destroyAll
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Deletes all redeemRecords of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.redeemRecords.destroyAll = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::delete::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#destroyById
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Delete a related item by id for redeemRecords.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for redeemRecords
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.redeemRecords.destroyById = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::destroyById::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#findById
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Find a related item by id for redeemRecords.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for redeemRecords
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R.redeemRecords.findById = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::findById::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TaxiGoUsers.redeemRecords#updateById
         * @methodOf lbServices.TaxiGoUsers.redeemRecords
         *
         * @description
         *
         * Update a related item by id for redeemRecords.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for redeemRecords
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R.redeemRecords.updateById = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::updateById::taxiGoUsers::redeemRecords"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.News
 * @header lbServices.News
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `News` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "News",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/news/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.News#create
         * @methodOf lbServices.News
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/news",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#createMany
         * @methodOf lbServices.News
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/news",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#upsert
         * @methodOf lbServices.News
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/news",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#exists
         * @methodOf lbServices.News
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/news/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#findById
         * @methodOf lbServices.News
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/news/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#find
         * @methodOf lbServices.News
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/news",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#findOne
         * @methodOf lbServices.News
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/news/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#updateAll
         * @methodOf lbServices.News
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/news/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#deleteById
         * @methodOf lbServices.News
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/news/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#count
         * @methodOf lbServices.News
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/news/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#prototype$updateAttributes
         * @methodOf lbServices.News
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/news/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#createChangeStream
         * @methodOf lbServices.News
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/news/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#getNewsJSON
         * @methodOf lbServices.News
         *
         * @description
         *
         * Some description of this remote Method.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * {'news_items':newsInstances}
         */
        "getNewsJSON": {
          url: urlBase + "/news/getNewsJSON",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#getNews
         * @methodOf lbServices.News
         *
         * @description
         *
         * Some description of this remote Method.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Taxi-GO standard return object.
         */
        "getNews": {
          url: urlBase + "/news/getNews",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#getHtml
         * @methodOf lbServices.News
         *
         * @description
         *
         * Some description of this remote Method.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The HTML text of news.
         */
        "getHtml": {
          url: urlBase + "/news/HTML",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.News#getHtmlJson
         * @methodOf lbServices.News
         *
         * @description
         *
         * Some description of this remote Method.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `req` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The HTML text of news.
         */
        "getHtmlJson": {
          url: urlBase + "/news/HTMLjson",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.News#updateOrCreate
         * @methodOf lbServices.News
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `News` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.News#update
         * @methodOf lbServices.News
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.News#destroyById
         * @methodOf lbServices.News
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.News#removeById
         * @methodOf lbServices.News
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.News#modelName
    * @propertyOf lbServices.News
    * @description
    * The name of the model represented by this $resource,
    * i.e. `News`.
    */
    R.modelName = "News";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Mission_progress
 * @header lbServices.Mission_progress
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Mission_progress` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Mission_progress",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/mission_progresses/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Mission_progress.mission() instead.
        "prototype$__get__mission": {
          url: urlBase + "/mission_progresses/:id/mission",
          method: "GET"
        },

        // INTERNAL. Use Mission_progress.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/mission_progresses/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Mission_progress.giftRedeem() instead.
        "prototype$__get__giftRedeem": {
          url: urlBase + "/mission_progresses/:id/giftRedeem",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#create
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/mission_progresses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#createMany
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/mission_progresses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#upsert
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/mission_progresses",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#exists
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/mission_progresses/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#findById
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/mission_progresses/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#find
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/mission_progresses",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#findOne
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/mission_progresses/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#updateAll
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/mission_progresses/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#deleteById
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/mission_progresses/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#count
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/mission_progresses/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#prototype$updateAttributes
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/mission_progresses/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#createChangeStream
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/mission_progresses/change-stream",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.findById() instead.
        "::findById::taxiGoUsers::missionRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/missionRecords/:fk",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.destroyById() instead.
        "::destroyById::taxiGoUsers::missionRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/missionRecords/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.updateById() instead.
        "::updateById::taxiGoUsers::missionRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/missionRecords/:fk",
          method: "PUT"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords() instead.
        "::get::taxiGoUsers::missionRecords": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.create() instead.
        "::create::taxiGoUsers::missionRecords": {
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.createMany() instead.
        "::createMany::taxiGoUsers::missionRecords": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.destroyAll() instead.
        "::delete::taxiGoUsers::missionRecords": {
          url: urlBase + "/taxiGoUsers/:id/missionRecords",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.missionRecords.count() instead.
        "::count::taxiGoUsers::missionRecords": {
          url: urlBase + "/taxiGoUsers/:id/missionRecords/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#updateOrCreate
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Mission_progress` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#update
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#destroyById
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#removeById
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Mission_progress#modelName
    * @propertyOf lbServices.Mission_progress
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Mission_progress`.
    */
    R.modelName = "Mission_progress";


        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#mission
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Fetches belongsTo relation mission.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Missions` object.)
         * </em>
         */
        R.mission = function() {
          var TargetResource = $injector.get("Missions");
          var action = TargetResource["::get::mission_progress::mission"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#user
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("TaxiGoUsers");
          var action = TargetResource["::get::mission_progress::user"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Mission_progress#giftRedeem
         * @methodOf lbServices.Mission_progress
         *
         * @description
         *
         * Fetches belongsTo relation giftRedeem.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R.giftRedeem = function() {
          var TargetResource = $injector.get("Gift_redeem");
          var action = TargetResource["::get::mission_progress::giftRedeem"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Logs_redeem
 * @header lbServices.Logs_redeem
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Logs_redeem` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Logs_redeem",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/logs_redeems/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#create
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/logs_redeems",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#createMany
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/logs_redeems",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#upsert
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/logs_redeems",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#exists
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/logs_redeems/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#findById
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/logs_redeems/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#find
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/logs_redeems",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#findOne
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/logs_redeems/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#updateAll
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/logs_redeems/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#deleteById
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/logs_redeems/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#count
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/logs_redeems/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#prototype$updateAttributes
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/logs_redeems/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#createChangeStream
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/logs_redeems/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#updateOrCreate
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Logs_redeem` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#update
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#destroyById
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Logs_redeem#removeById
         * @methodOf lbServices.Logs_redeem
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Logs_redeem#modelName
    * @propertyOf lbServices.Logs_redeem
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Logs_redeem`.
    */
    R.modelName = "Logs_redeem";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Gift_redeem
 * @header lbServices.Gift_redeem
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Gift_redeem` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Gift_redeem",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/gift_redeems/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Gift_redeem.gift() instead.
        "prototype$__get__gift": {
          url: urlBase + "/gift_redeems/:id/gift",
          method: "GET"
        },

        // INTERNAL. Use Gift_redeem.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/gift_redeems/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#create
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/gift_redeems",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#createMany
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/gift_redeems",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#upsert
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/gift_redeems",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#exists
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/gift_redeems/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#findById
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/gift_redeems/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#find
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/gift_redeems",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#findOne
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/gift_redeems/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#updateAll
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/gift_redeems/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#deleteById
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/gift_redeems/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#count
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/gift_redeems/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#prototype$updateAttributes
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/gift_redeems/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#createChangeStream
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/gift_redeems/change-stream",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.findById() instead.
        "::findById::taxiGoUsers::redeemRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/:fk",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.destroyById() instead.
        "::destroyById::taxiGoUsers::redeemRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.updateById() instead.
        "::updateById::taxiGoUsers::redeemRecords": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/:fk",
          method: "PUT"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords() instead.
        "::get::taxiGoUsers::redeemRecords": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "GET"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.create() instead.
        "::create::taxiGoUsers::redeemRecords": {
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.createMany() instead.
        "::createMany::taxiGoUsers::redeemRecords": {
          isArray: true,
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "POST"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.destroyAll() instead.
        "::delete::taxiGoUsers::redeemRecords": {
          url: urlBase + "/taxiGoUsers/:id/redeemRecords",
          method: "DELETE"
        },

        // INTERNAL. Use TaxiGoUsers.redeemRecords.count() instead.
        "::count::taxiGoUsers::redeemRecords": {
          url: urlBase + "/taxiGoUsers/:id/redeemRecords/count",
          method: "GET"
        },

        // INTERNAL. Use Mission_progress.giftRedeem() instead.
        "::get::mission_progress::giftRedeem": {
          url: urlBase + "/mission_progresses/:id/giftRedeem",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#updateOrCreate
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gift_redeem` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#update
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#destroyById
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#removeById
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Gift_redeem#modelName
    * @propertyOf lbServices.Gift_redeem
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Gift_redeem`.
    */
    R.modelName = "Gift_redeem";


        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#gift
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Fetches belongsTo relation gift.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Gifts` object.)
         * </em>
         */
        R.gift = function() {
          var TargetResource = $injector.get("Gifts");
          var action = TargetResource["::get::gift_redeem::gift"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Gift_redeem#user
         * @methodOf lbServices.Gift_redeem
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TaxiGoUsers` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("TaxiGoUsers");
          var action = TargetResource["::get::gift_redeem::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.View_distinct_mission_progress
 * @header lbServices.View_distinct_mission_progress
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `View_distinct_mission_progress` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "View_distinct_mission_progress",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/view_distinct_mission_progresses/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#create
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/view_distinct_mission_progresses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#createMany
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/view_distinct_mission_progresses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#upsert
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/view_distinct_mission_progresses",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#exists
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/view_distinct_mission_progresses/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#findById
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/view_distinct_mission_progresses/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#find
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/view_distinct_mission_progresses",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#findOne
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/view_distinct_mission_progresses/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#updateAll
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/view_distinct_mission_progresses/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#deleteById
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/view_distinct_mission_progresses/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#count
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/view_distinct_mission_progresses/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#prototype$updateAttributes
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/view_distinct_mission_progresses/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#createChangeStream
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/view_distinct_mission_progresses/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#updateOrCreate
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `View_distinct_mission_progress` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#update
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#destroyById
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.View_distinct_mission_progress#removeById
         * @methodOf lbServices.View_distinct_mission_progress
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.View_distinct_mission_progress#modelName
    * @propertyOf lbServices.View_distinct_mission_progress
    * @description
    * The name of the model represented by this $resource,
    * i.e. `View_distinct_mission_progress`.
    */
    R.modelName = "View_distinct_mission_progress";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.PublicContainer
 * @header lbServices.PublicContainer
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `PublicContainer` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "PublicContainer",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/PublicContainers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#getContainers
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PublicContainer` object.)
         * </em>
         */
        "getContainers": {
          isArray: true,
          url: urlBase + "/PublicContainers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#createContainer
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PublicContainer` object.)
         * </em>
         */
        "createContainer": {
          url: urlBase + "/PublicContainers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#destroyContainer
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "destroyContainer": {
          url: urlBase + "/PublicContainers/:container",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#getContainer
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PublicContainer` object.)
         * </em>
         */
        "getContainer": {
          url: urlBase + "/PublicContainers/:container",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#getFiles
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PublicContainer` object.)
         * </em>
         */
        "getFiles": {
          isArray: true,
          url: urlBase + "/PublicContainers/:container/files",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#getFile
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `PublicContainer` object.)
         * </em>
         */
        "getFile": {
          url: urlBase + "/PublicContainers/:container/files/:file",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#removeFile
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "removeFile": {
          url: urlBase + "/PublicContainers/:container/files/:file",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#upload
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `result` – `{object=}` - 
         */
        "upload": {
          url: urlBase + "/PublicContainers/:container/upload",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.PublicContainer#download
         * @methodOf lbServices.PublicContainer
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "download": {
          url: urlBase + "/PublicContainers/:container/download/:file",
          method: "GET"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.PublicContainer#modelName
    * @propertyOf lbServices.PublicContainer
    * @description
    * The name of the model represented by this $resource,
    * i.e. `PublicContainer`.
    */
    R.modelName = "PublicContainer";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
