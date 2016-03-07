/* global angular,window*/
angular.module('myApp').controller('monitorController', [
    '$scope',
    'AdminTools',
    'Order',
    'OrderDistributor',
    // 'DB_view_avaliable_orders',
    // 'DB_view_order',
    // 'DB_driver',
    function($scope, AdminTools, Order, OrderDistributor) {
        var self = this;
        self.filters = {};
        self.filters.orderVipWaiting = function(value, index, array) {
            // console.log(value);
            return value['driver_id'].toString() !== '0';
        };
        self.filters.orderNormalWaiting = function(value, index, array) {
            return value['driver_id'].toString() === '0';
        };
        self.filters.onlineDrivers = function(value,index,array){
            return value['status']==='1';
        }
        self.filters.vipDrivers = function(value, index, array) {
            var NOW = new Date();
            // return (value['driver_type'].toString() === '1') && (value['status'].toString() === '1') && ((NOW - new Date(value['last_update'])<90000)) ;
            return (value['driver_type'].toString() === '1') && (value['status'].toString() === '1');
        };
        window.AdminTools = AdminTools;
        self.selectedMarker = {};
        self.selectedItems = [];
        self.selectedOrder = [];
        self.selectedDriver = [];
        self.requestList = self.requestList || {};
        self.orderCache = {
                order: {},
                driver: {}
            }
        self.returnDate = function(dateString){
          return new Date(dateString);
        };
        self.findDriver = function(driverId){
            if (!(self.driversList.drivers instanceof Array)) return false;
            return self.driversList.drivers.filter(function (item){return item.id == driverId;})[0];
        };
        var orderDataSource = (function orderDataSource() {

            AdminTools.ajaxData({
                types: 'order'
            }).$promise.then(function(result) {
                if (!_.isEqual(self.requestList, result.data)) {
                    self.requestList = result.data;
                };
                // self.requestList = result.data.orders;
                // $scope.$apply();
            });
            setTimeout(orderDataSource, 1000 + Math.random() * 1000);
        })();
        self.waitingRequests = self.waitingRequests || {};
        var waitingOrderSource = (function waitingOrderSource() {

            AdminTools.ajaxData({
                types: 'waiting_order'
            }).$promise.then(function(result) {
                // self.waitingRequests = result.data.orders;
                if (!_.isEqual(self.waitingRequests, result.data)) {
                    self.waitingRequests = result.data;
                };
                // _.extend(self.waitingRequests, result.data);
            });
            setTimeout(waitingOrderSource, 3000 + Math.random() * 1000);

        })();
        self.waitingNormalRequests = self.waitingNormalRequests || {};
        var waitingNormalOrderSource = (function waitingOrderSource() {

            AdminTools.ajaxData({
                types: 'waiting_normal_order'
            }).$promise.then(function(result) {
                // self.waitingNormalRequests = result.data.orders;
                if (!_.isEqual(self.waitingNormalRequests, result.data)) {
                    self.waitingNormalRequests = result.data;
                };
                // _.extend(self.waitingRequests, result.data);
            });
            setTimeout(waitingOrderSource, 3000 + Math.random() * 1000);

        })();
        self.driversList = self.driversList || {};
        var driverDataSource = (function driverDataSource() {

            AdminTools.ajaxData({
                types: 'driver'
            }).$promise.then(function(result) {
                // self.driversList = result.data.drivers;
                // _.extend(self.driversList, result.data);
                if (!_.isEqual(self.driversList, result.data)) {
                    self.driversList = result.data;
                };
            });
            setTimeout(driverDataSource, 1000 + Math.random() * 1000);

        })();
        self.successRequests = self.successRequests || {};
        // var successOrderSource = (function successOrderSource() {

        //     AdminTools.ajaxData({
        //         types: 'success_order'
        //     }).$promise.then(function(result) {
        //         if (!_.isEqual(self.successRequests, result.data)) {
        //             self.successRequests = result.data;
        //         };
        //     });
        //     setTimeout(successOrderSource, 3000 + Math.random() * 1000);

        // })();
        // self.cancelledRequests = self.cancelledRequests || {};
        // var cancelledOrderSource = (function cancelledOrderSource() {

        //     AdminTools.ajaxData({
        //         types: 'cancel_order'
        //     }).$promise.then(function(result) {
        //         if (!_.isEqual(self.cancelledRequests, result.data)) {
        //             self.cancelledRequests = result.data;
        //         };
        //     });
        //     setTimeout(cancelledOrderSource, 3000 + Math.random() * 1000);

        // })();
        self.completedRequests = self.completedRequests || {};
        var completedOrderSource = (function completedOrderSource() {
            AdminTools.ajaxData({
                types: 'complete_order'
            }).$promise.then(function(result) {
                if (!_.isEqual(self.completedRequests, result.data)) {
                    self.completedRequests = result.data;
                };
            });
            setTimeout(completedOrderSource, 3000 + Math.random() * 1000);
        })();
        // self.waitingRequests = AdminTools.ajaxData({types:'waiting_order'});
        // self.driversList = AdminTools.ajaxData({types:'driver'});
        // self.successOrders = AdminTools.ajaxData({types:'success_order'});
        // self.cancelledOrders = AdminTools.ajaxData({types:'cancel_order'});
        // self.completedOrder = AdminTools.ajaxData({types:'complete_order'});
        // }
        // updateData();
        /**
         * [requestListSource description]
         * @return {[type]} [description]
         */
        // var requestListSource = function(){
        //   var src = new EventSource('/api/DB_view_orders/change-stream?_format=event-source');
        //   var changes = createChangeStream(src);
        //   var set;
        //   DB_view_order.find().$promise.then(function(results){
        //     // console.log(results);
        //     // console.log(changes);
        //     set = new LiveSet(results,changes);
        //     self.requestList = set.toLiveArray();
        //     console.log(set);
        //   });
        // };
        // requestListSource();

        // var driversListSource = function(){
        //   var src = new EventSource('/api/DB_drivers/change-stream?_format=event-source');
        //   var changes = createChangeStream(src);
        //   var set;
        //   DB_driver.find().$promise.then(function(results){
        //     // console.log(results);
        //     // console.log(changes);
        //     set = new LiveSet(results,changes);
        //     self.driversList = set.toLiveArray();
        //     console.log(set);
        //   });
        // };
        // driversListSource();


        self.distributeOrder = (function OrderDistributerClient() {

            self.orderCache = self.orderCache || {
                order: {},
                driver: {}
            };
            var orderCache = self.orderCache;
            // self.orderCache = orderCache;
            var index;
            return function(order, driver) {
                if (arguments.length === 3){
                    order = arguments[1];
                    driver = arguments[2];
                }
                console.log('order Distributor Called');
                console.log('order',order);
                console.log('driver',driver);
                if (order) {
                    if (!_.isEqual(self.orderCache.order.id, order.id)) {
                        index = self.selectedOrder.indexOf(self.orderCache.order.id);
                        if (index > -1) {
                            self.selectedOrder.splice(index, 1);
                        }
                        self.orderCache.order = order;
                        self.selectedOrder.push(self.orderCache.order.id);
                    } else {
                        index = self.selectedOrder.indexOf(order.id);
                        if (index > -1) {
                            self.selectedOrder.splice(index, 1);
                        }
                        // delete self.orderCache.order;
                        self.orderCache.order = {};
                        return false;
                    }
                } else if (driver) {
                    if (!_.isEqual(self.orderCache.driver.id, driver.id)) {
                        index = self.selectedDriver.indexOf(self.orderCache.driver.id);
                        if (index > -1) {
                            self.selectedDriver.splice(index, 1);
                        }
                        self.orderCache.driver = driver;
                        self.selectedDriver.push(self.orderCache.driver.id);
                    } else {
                        index = self.selectedDriver.indexOf(driver.id);
                        if (index > -1) {
                            self.selectedDriver.splice(index, 1);
                        }
                        // delete self.orderCache.driver;
                        self.orderCache.driver = {};
                        return false;
                    }
                }
                if (self.orderCache.order.id && self.orderCache.driver.id) {
                    // var orderListIds = self.waitingRequests.orders.map(function(a){return a.id});
                    // var driverIds = [];
                    


                    console.log(orderCache);

                    console.log('OrderDistribute order_id:', self.orderCache.order.id, ' driver_id: ', self.orderCache.driver.id);

                    OrderDistributor.hardAssign({
                        'order_id': self.orderCache.order.id,
                        'driver_id': self.orderCache.driver.id,
                        'orderId': self.orderCache.order.id,
                        'driverId': self.orderCache.driver.id,
                    }).$promise.then(function(result) {
                        if (result.code === 1) {
                            console.log("派單成功");
                        }
                    });
                    // toaster.pop('success', '派單', '指派' + self.orderCache.order.id + '號訂單給' + order.Cache.driver.id + '號司機');
                    index = self.selectedOrder.indexOf(self.orderCache.order.id);
                    if (index > -1) {
                        self.selectedOrder.splice(index, 1);
                    }
                    index = self.selectedDriver.indexOf(self.orderCache.driver.id);
                    if (index > -1) {
                        self.selectedDriver.splice(index, 1);
                    }
                    self.orderCache = orderCache = {
                        order: {},
                        driver: {}
                    };

                }
                $scope.$apply();
            };
        })();

        self.pointToAddress = (function() {
            var searchLogDict = {};
            return function getSearchLog(referenceCode) {

                if (searchLogDict[referenceCode]) {
                    return searchLogDict[referenceCode];
                }
                searchLogDict[referenceCode] = {};
                AdminTools.getSearchLog({
                    'reference_code': referenceCode
                }).$promise.then(function(resultObject) {
                    searchLogDict[referenceCode] = resultObject;
                });
                return setTimeout(function() {
                    return getSearchLog(referenceCode);
                }, 500);
            };
        })();
        self.getDriverLocation = (function() {
            var driverLocationCache = {};
            return function (driver){
                var locStr;
                if (driverLocationCache[driver['id']]){
                    try{
                    locStr = JSON.parse(driver['loc_str']);
                    }catch(e){
                    }
                } else {
                    driverLocationCache[driver['id']]={};
                    try{
                        driverLocationCache[driver['id']][driver['ref_index']] = JSON.parse(driver['loc_str']);
                    }catch(e){}
                    driverLocationCache[driver['id']].currentPointIndex=0;
                }
            };
        })();
        // this.toaster = toaster;

        window.C = this;
    }
]);