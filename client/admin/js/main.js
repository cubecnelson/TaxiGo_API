/* global angular,window */
var myApp = angular.module('myApp', ['ng-admin','lbServices','ngResource','ngMap','smart-table']);
var apiBase = window.location.protocol+'//'+window.location.host+'/api/';
myApp.config(['RestangularProvider',function (RestangularProvider){
    if (window.localStorage.getItem('accessTokenId')) {
        RestangularProvider.setDefaultHeaders({'Authorization': window.localStorage.getItem('accessTokenId')});    
    } 
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation === 'getList') {
            // custom pagination params
            if (params._page) {
                params['filter[limit]'] = params._perPage;
                params['filter[skip]'] = (params._page - 1) * params._perPage; //skip is the same os offset
                delete params._page;
                delete params._perPage;
            }
            if (params._sortField) {
                if (params._sortDir){
                    params['filter[order]'] = params._sortField+' '+params._sortDir;   
                    delete params._sortDir; 
                } else {
                    params['filter[order]'] = params._sortField;
                }
                delete params._sortField;
            }
            if (typeof params._filters === 'object'){
                for (var prop in params._filters) {
                    if (params._filters.hasOwnProperty(prop)) {
                        console.log(params._filters[prop]);
                        params['filter[where]['+prop+']'] = params._filters[prop];
                    }
                }
                // params['filter[where]']=params._filters;
                delete params._filters;
            }
            // console.log(params);
            return {params: params};
        }
        console.log(params);
    });
}]);
myApp.config(function(LoopBackResourceProvider) {
    var apiBase = window.location.protocol+'//'+window.location.host+'/api';
    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
 
    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase(apiBase);
  });
myApp.config(function ($stateProvider) {
    $stateProvider.state('monitor', {
        parent: 'main',
        url: '/monitor',
        params: { id: null },
        controller: 'monitorController',
        controllerAs: 'C',
        templateUrl: 'template/monitor.html',
        // template:'<map style="height:100%"></map>',
        onEnter: function (){
            //$('#page-wrapper').offset().top);
        },
        onLeave: function (){
            // $('#page-wrapper').removeAttr('style');
        }
    });
    $stateProvider.state('orderDistributor', {
        parent: 'main',
        url: '/orderDistributor',
        params: { id: null },
        controller: 'monitorController',
        controllerAs: 'C',
        templateUrl: 'template/orderDistributorView.html',
        // template:'<map style="height:100%"></map>',
        onEnter: function (){
            //$('#page-wrapper').offset().top);
        },
        onLeave: function (){
            // $('#page-wrapper').removeAttr('style');
        }
    });
});
myApp.config(['NgAdminConfigurationProvider','RestangularProvider', function (nga,RestangularProvider) {
    // create an admin application
    function toLocalTime (value){
        if(value){
            return new Date(value).toLocaleString();
        } else {
            return undefined;
        }
    }
    function driverType (value){
        if (!value) return '';
        switch(value.toString()){
            case '1':
                return '專車';
            case '2':
                return '普通車';
        }
    }
    function driverStatus (value){
        if (!value) return 'undefined';
        switch(value.toString()){
            case '0':
                return '行進中';
            case '1':
                return '待機';
            case '2':
                return '已指派訂單';
            case '3':
                return '前往接客中';
            case '999':
                return '休息中';
            default:
                return '未知的狀態代碼';
        }
    }
    function passengerStatus (value){
        if (!value) return 'undefined';
        switch(value.toString()){
            case '0':
                return '行進中';
            case '1':
                return '待機';
            case '2':
                return '等待中';
            case '3':
                return '前往乘車中';
            default:
                return '未知的狀態代碼';
        }
    }
    var admin = nga.application('TaxiGO Admin Panel',true)
      .baseApiUrl(apiBase); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    /**
     * User Entity
     * @type ng-Admin Entity
     */
    var user = nga.entity('taxiGoUsers').label('用戶');
    user.listView().title('TaxiGo用戶列表').fields([
        nga.field('id').label('編號'),
        nga.field('name').label('顯示名稱'),
        nga.field('realm').label('用戶類型')
    ]).filters([
        nga.field('realm', 'choice').choices([
            { value: 'admin', label: '管理員' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]),
    ]);
    user.editionView().title('編輯用戶 #{{::entry.values.id}}').fields([
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('name').label('顯式名稱'),
    ]);
    // add the user entity to the admin application
    admin.addEntity(user);
    // attach the admin application to the DOM and execute it
    // nga.configure(admin);

    /**
     * News Entity
     * @type ng-Admin Entity
     */
    var newsModel = nga.entity('news').label('最新消息');
    newsModel.listView().fields([
        nga.field('id').label('編號'),
        nga.field('title').label('標題'),
        nga.field('publish_since').label('發佈日期').map(toLocalTime),
        nga.field('publish_till').label('發佈截止日期').map(toLocalTime),
    ]).listActions(['show','edit', 'delete']).title('最新消息');
    newsModel.showView().fields([
        nga.field('title').label('標題'),
        // nga.field('cost').label('Cost')
        //     .attributes({ placeholder: 'No space allowed, 5 chars min' })
        //     .validation({ required: true, pattern: '[0-9]{1,11}' }),
        nga.field('content','wysiwyg').label('內容'),
        nga.field('realm','choice').choices([
            { value: 'public', label: '公開' },
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]).label('範疇'),
        // nga.field('mission_type','choice').choices([
        //     { value: 'DAILY_MISSION', label: '每日任務' },
        //     { value: 'PRESISTED_MISSION', label: '常駐任務' },
        //     { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('publish_since','datetime')
            .defaultValue(new Date())
            .label('Publish since'),
        nga.field('publish_till','datetime').label('Publish untill')
    ]);
    newsModel.creationView().title('新增最新消息').fields([
        nga.field('title').label('標題'),
        // nga.field('cost').label('Cost')
        //     .attributes({ placeholder: 'No space allowed, 5 chars min' })
        //     .validation({ required: true, pattern: '[0-9]{1,11}' }),
        nga.field('content','wysiwyg').label('內容'),
        nga.field('realm','choice').choices([
            { value: 'public', label: '公開' },
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]).label('範疇'),
        // nga.field('mission_type','choice').choices([
        //     { value: 'DAILY_MISSION', label: '每日任務' },
        //     { value: 'PRESISTED_MISSION', label: '常駐任務' },
        //     { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('publish_since','datetime')
            .defaultValue(new Date())
            .label('Publish since'),
        nga.field('publish_till','datetime').label('Publish untill')
    ]);
    newsModel.editionView().title('編輯最新消息 #{{::entry.values.id}}').fields([
        nga.field('title').label('標題'),
        // nga.field('cost').label('Cost')
        //     .attributes({ placeholder: 'No space allowed, 5 chars min' })
        //     .validation({ required: true, pattern: '[0-9]{1,11}' }),
        nga.field('content','wysiwyg').label('內容'),
        nga.field('realm','choice').choices([
            { value: 'public', label: '公開' },
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]).label('範疇'),
        // nga.field('mission_type','choice').choices([
        //     { value: 'DAILY_MISSION', label: '每日任務' },
        //     { value: 'PRESISTED_MISSION', label: '常駐任務' },
        //     { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('publish_since','datetime')
            .defaultValue(new Date())
            .label('Publish since'),
        nga.field('publish_till','datetime').label('Publish untill')
    ]);
    admin.addEntity(newsModel);
    

    /**
     * Passengers Entity
     * @type {[type]}
     */
    var passengers = nga.entity('member').label('乘客');
    passengers.listView().title('乘客列表').fields([
        nga.field('id').label('乘客編號'),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('status').label('乘客狀態').map(passengerStatus),
        nga.field('country_code').label('區號'),
    ]).listActions(['show','edit', 'delete']);
    
    passengers.showView().title('乘客 #{{::entry.values.id}}').fields([
        nga.field('id').label('乘客編號'),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('status').label('乘客狀態'),
        nga.field('driver_type').label('司機類型'),
        nga.field('country_code').label('區號'),
    ]);

    // passengers.creationView().fields([
    //     nga.field('country_code','choice').label('區號').choices([
    //         { value: '852', label: 'Hong Kong 852' },
    //         { value: '853', label: 'Macaw 853' },
    //         { value: '86', label: 'P.R.C. 86' },])
    //         .validation({ required: true,}),
    //     nga.field('tel').label('電話號碼')
    //         .attributes({ placeholder: 'No space allowed, 8 chars min' })
    //         .validation({ required: true, pattern: '[0-9]{8,11}' }),
    //     nga.field('family_name').label('姓氏'),
    //     nga.field('given_name').label('名字'),
    // ]);

    passengers.editionView().title('編輯乘客 #{{::entry.values.id}}').fields([
        nga.field('country_code','choice').label('區號').choices([
            { value: '852', label: 'HK 852' },
            { value: '853', label: 'Macaw 853' },
            { value: '86', label: 'P.R.C. 86' },])
            .validation({ required: true,}),
        nga.field('tel').label('電話號碼')
            .attributes({ placeholder: 'No space allowed, 8 chars min' })
            .validation({ required: true, pattern: '[0-9]{8,11}' }),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
    ]);

    admin.addEntity(passengers);
    /**
     * Drivers Entity
     * @type {[type]}
     */
    var drivers = nga.entity('driver').label('司機');;
    drivers.listView().title('司機列表').fields([
        nga.field('id').label('司機序號'),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('status').label('司機狀態').map(driverStatus),
        nga.field('driver_type').label('司機類型').map(driverType),
        nga.field('country_code').label('區號'),
    ]).listActions(['show','edit', 'delete']);
    
    drivers.showView().title('司機 #{{::entry.values.id}}').fields([
        nga.field('id').label('司機序號'),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('status').label('司機狀態'),
        nga.field('driver_type').label('司機類型'),
        nga.field('country_code').label('區號'),
    ]);

    drivers.creationView().title('新增司機').fields([
        nga.field('country_code','choice').label('區號').choices([
            { value: '852', label: 'Hong Kong 852' },
            { value: '853', label: 'Macaw 853' },
            { value: '86', label: 'P.R.C. 86' },])
            .validation({ required: true,}),
        nga.field('phone').label('電話號碼')
            .attributes({ placeholder: 'No space allowed, 8 chars min' })
            .validation({ required: true, pattern: '[0-9]{8,11}' }),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('license').label('車牌'),
        nga.field('driver_type','choice').label('司機類型').choices([
            { value: '1', label: 'VIP' },
            { value: '2', label: 'NORMAL' },])
            .validation({ required: true,}),
    ]);

    drivers.editionView().title('編輯司機 #{{::entry.values.id}}').fields([
        nga.field('country_code','choice').label('區號').choices([
            { value: '852', label: 'HK 852' },
            { value: '853', label: 'Macaw 853' },
            { value: '86', label: 'P.R.C. 86' },])
            .validation({ required: true,}),
        nga.field('phone').label('電話號碼')
            .attributes({ placeholder: 'No space allowed, 8 chars min' })
            .validation({ required: true, pattern: '[0-9]{8,11}' }),
        nga.field('family_name').label('姓氏'),
        nga.field('given_name').label('名字'),
        nga.field('license').label('車牌'),
        nga.field('driver_type','choice').label('司機類型').choices([
            { value: '1', label: 'VIP' },
            { value: '2', label: 'NORMAL' },])
            .validation({ required: true,}),
        nga.field('status','choice').label('司機狀態').choices([
            { value: '0', label: '行進中'},
            { value: '1', label: '待機' },
            { value: '2', label: '已指派訂單' },
            { value: '3', label: '前往接客中'},
            { value: '999', label: '休息中'}]),
        nga.field('waitting_id').label('Ongoing Order Id'),
    ]);

    admin.addEntity(drivers);
    /**
     * gifts entity
     * @type ng-Admin Entity
     */
    var giftIcons = nga.entity('gift-icons').url(function(entityName, viewType, identifierValue, identifierName) {
      console.log(viewType);
      // return '/comments/' + entityName + '_' + viewType + '?' + identifierName + '=' + identifierValue; // Can be absolute or relative
      switch (viewType){
        case 'listView':
            return '/PublicContainers/'+entityName+'/files';
        default:
        return '/PublicContainers/'+entityName;
      } 
    }).identifier(nga.field('name'));

    var gifts = nga.entity('gifts').label('禮品');;
    // gifts List view
    gifts.listView().title('禮品列表').fields([
        nga.field('id').label('禮品序號'),
        nga.field('name').label('禮品名稱'),
        nga.field('cost').label('所需積分'),
        nga.field('available_since').label('available after').map(toLocalTime),
        nga.field('image').template('<img src="{{entry.values.image}}" width="45" class="poster_mini_thumbnail" />'),,
    ]).listActions(['show','edit', 'delete']);
    gifts.showView().title('禮品 #{{::entry.values.id}}').fields([
        nga.field('name').label('禮品名稱'),
        nga.field('cost').label('所需積分')
            .attributes({ placeholder: 'No space allowed, 5 chars min' })
            .validation({ required: true, pattern: '[0-9]{1,11}' }),
        nga.field('detail_descriptions','wysiwyg').label('詳細內容'),
        nga.field('realm','choice').choices([
            { value: 'mission', label: '任務專用' },
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機專用' },
            { value: 'passenger', label: '乘客專用' }]).label('適用範圍'),
        nga.field('mission_type','choice').choices([
            { value: 'DAILY_MISSION', label: '每日任務' },
            { value: 'PRESISTED_MISSION', label: '常駐任務' },
            { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('available_since','datetime').label('開始日期'),
        nga.field('available_till','datetime').label('截止日期'),
        nga.field('void_after','datetime').label('失效日期'),
    ]);
    gifts.creationView().title('新增禮品').fields([
        nga.field('name').label('禮品名稱'),
        nga.field('cost').label('所需積分')
            .attributes({ placeholder: 'No space allowed, 5 chars min' })
            .validation({ required: true, pattern: '[0-9]{1,11}' }),
        nga.field('detail_descriptions','wysiwyg').label('詳細內容'),
        nga.field(null, 'template').label('').template('<img src="{{\'/public/gift-icons/\'+entry.values.icon}}" class="poster_mini_thumbnail" />'),
        nga.field('icon','reference').label('icon')
            .targetEntity(giftIcons).targetField(nga.field('name')),
        nga.field('realm','choice').choices([
            { value: 'mission', label: '任務專用' },
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機專用' },
            { value: 'passenger', label: '乘客專用' }]).label('適用範圍'),
        nga.field('mission_type','choice').choices([
            { value: 'DAILY_MISSION', label: '每日任務' },
            { value: 'PRESISTED_MISSION', label: '常駐任務' },
            { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('available_since','datetime').label('開始日期'),
        nga.field('available_till','datetime').label('截止日期'),
        nga.field('void_after','datetime').label('失效日期'),
        nga.field('picture', 'file').uploadInformation({ 'url': '/api/PublicContainers/gift-icons/upload'}),
    ]);
    gifts.editionView().title('編輯禮品 #{{::entry.values.id}}').fields(gifts.creationView().fields());
    admin.addEntity(gifts);

    /**
     * Missions Entity
     * @type ng-Admin Entity
     */
    var missions = nga.entity('missions').label('任務');
    missions.listView().title('任務列表').fields([
        nga.field('id'),
        nga.field('name'),
        nga.field('available_since').label('開始日期').map(toLocalTime),
        nga.field('available_till').label('截止日期').map(toLocalTime),
        nga.field('mission_type').label('任務類型')
        // nga.field('rewardId','reference').targetEntity(gifts).targetField(nga.field('name')).label('Gift'),
    ]).listActions(['show','edit', 'delete']);
    missions.showView().title('任務 #{{::entry.values.id}}').fields([
        nga.field('name').label('任務名稱'),
        nga.field('realm','choice').choices([
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]).label('範疇'),
        nga.field('content','text').label('任務內容'),
        nga.field('rewardId','reference').label('獎品')
            .targetEntity(gifts).targetField(nga.field('name')),
        nga.field('required_count','number').label('需要進行次數'),
        nga.field('mission_type','choice').choices([
            { value: 'DAILY_MISSION', label: '每日任務' },
            { value: 'PRESISTED_MISSION', label: '常駐任務' },
            { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('gift_points').label('積分'),
        nga.field('available_since','datetime').label('開始日期'),
        nga.field('available_till','datetime').label('截止日期'),
        nga.field('void_after','datetime').label('失效日期'),
        nga.field('cutoff_time','datetime').label('結算時間（每日任務專用）'),
    ]);
    missions.creationView().title('新增任務').fields([
        nga.field('name').label('任務名稱'),
        nga.field('realm','choice').choices([
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]).label('範疇'),
        nga.field('content','text').label('任務內容'),
        nga.field('rewardId','reference').label('獎品')
            .targetEntity(gifts).targetField(nga.field('name')),
        nga.field('required_count','number').label('需要進行次數'),
        nga.field('mission_type','choice').choices([
            { value: 'DAILY_MISSION', label: '每日任務' },
            { value: 'PRESISTED_MISSION', label: '常駐任務' },
            { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('gift_points').label('積分'),
        nga.field('available_since','datetime').label('開始日期'),
        nga.field('available_till','datetime').label('截止日期'),
        nga.field('void_after','datetime').label('失效日期'),
        nga.field('cutoff_time','datetime').label('結算時間（每日任務專用）'),
    ]);
    missions.editionView().title('編輯任務 #{{::entry.values.id}}').fields([
        nga.field('name').label('任務名稱'),
        nga.field('realm','choice').choices([
            { value: 'driver,passenger', label: '司機及乘客' },
            { value: 'driver', label: '司機' },
            { value: 'passenger', label: '乘客' }]).label('範疇'),
        nga.field('content','text').label('任務內容'),
        nga.field('rewardId','reference').label('獎品')
            .targetEntity(gifts).targetField(nga.field('name')),
        nga.field('required_count','number').label('需要進行次數'),
        nga.field('mission_type','choice').choices([
            { value: 'DAILY_MISSION', label: '每日任務' },
            { value: 'PRESISTED_MISSION', label: '常駐任務' },
            { value: 'REPEATING_MISSION', label: '重複性任務' },]),
        nga.field('gift_points').label('積分'),
        nga.field('available_since','datetime').label('開始日期'),
        nga.field('available_till','datetime').label('截止日期'),
        nga.field('void_after','datetime').label('失效日期'),
        nga.field('cutoff_time','datetime').label('結算時間（每日任務專用）'),
    ]);
    admin.addEntity(missions);

    // customize header
    var customHeaderTemplate =
'<div class="navbar-header">'+
    '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">'+
        '<span class="icon-bar"></span>'+
        '<span class="icon-bar"></span>'+
        '<span class="icon-bar"></span>'+
    '</button>'+
    '<a class="navbar-brand" href="#" ng-click="appController.displayHome()">TaxiGo 管理平台</a>'+
'</div>'+
'<ul class="nav navbar-top-links navbar-right hidden-xs">'+
    '<li><a href="#"><i class="fa fa-fw fa-expand" onclick="toggleFullScreen()"></i> 全螢幕</a></li>'+
    '<li dropdown>'+
        '<a dropdown-toggle href="#" aria-expanded="true" ng-controller="username as U">'+
            '<i class="fa fa-fw fa-user fa-lg"></i>&nbsp;{{ U.username }}&nbsp;<i class="fa fa-fw fa-caret-down"></i>'+
        '</a>'+
        '<ul class="dropdown-menu dropdown-user" role="menu">'+
            '<li><a href="#" onclick="logout()"><i class="fa fa-fw fa-sign-out fa-fw"></i> 登出</a></li>'+
        '</ul>'+
    '</li>'+
'</ul>';
    var layoutTemplate = 
'<div id="wrapper" style="position:absolute;top:0;bottom:0;">'+
    '<nav id="header-nav" class="navbar navbar-default navbar-static-top" role="navigation">'+
        '<span compile="::appController.header">'+
        '<div class="navbar-header">'+
            '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
            '</button>'+
            '<a href="#" ng-click="appController.displayHome()" class="navbar-brand">{{ ::appController.applicationName }}</a>'+
        '</div>'+
        '</span>'+
        '<ma-menu-bar menu="::appController.menu"></ma-menu-bar>'+
    '</nav>'+
    '<div id="page-wrapper" class="mywrapper" style="min-height: 640px;left:0;right:0;">'+
        '<div class="view-body" ui-view style="height:100%;"></div>'+
    '</div>'+
    '<div id="loader"></div>'+
'</div>';



    admin.header(customHeaderTemplate);
    admin.layout(layoutTemplate);
    // $.get('template/layout.html',{}, function (data,status){
    //     admin.layout(data);
    // });

    admin.menu(nga.menu()
        .addChild(nga.menu(user).icon('<span class="fa fa-fw fa-users"></span>'))
        .addChild(nga.menu(drivers).icon('<span class="fa fa-fw fa-taxi"></span>'))
        .addChild(nga.menu(passengers).icon('<span class="fa fa-fw fa-street-view"></span>'))
        .addChild(nga.menu(newsModel).icon('<span class="fa fa-fw fa-newspaper-o"></span>'))
        .addChild(nga.menu(gifts).icon('<span class="fa fa-fw fa-gift"></span>'))
        .addChild(nga.menu(missions).icon('<span class="fa fa-fw fa-list-ol"></span>'))
        .addChild(nga.menu()
            .icon('<span class="fa fa-fw fa-list-alt"></span>')
            .title('實時監控')
            .link('/monitor')
            )
        // .addChild(nga.menu()
        //     .title('Order Distributor')
        //     .link('/orderDistributor')
        //     )
        );
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
// myApp.run('name', ['NgAdminConfigurationProvider','$http', function(nga,$http){
//     $http({
//         method: 'GET',
//         url: 'template/layout.html',
//     }).then(function successCallback(response){
//         var admin = nga.application('TaxiGO Admin Panel',true);
//         admin.layout(response);
//     },function errCallback(response){});
    
// }]);

myApp.controller('username', ['$rootScope','$scope', '$window','$http','LoopBackAuth',function($rootScope,$scope, $window, $http,LoopBackAuth) { // used in header.html
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $('#page-wrapper').css('min-height',$(window).height()-52);
    });
    
    $(window).resize(function (){
        $('#page-wrapper').css('min-height',$(window).height()-52);
    });
  var self = this;
  if ($window.localStorage.getItem('accessTokenId')){
    $http({
      method: 'GET',
      url: '/api/taxiGoUsers/me',
      headers: {
        Authorization: $window.localStorage.getItem('accessTokenId')
      }
    }).then(function successCallback(response) {
      self.username = response.data.name;
      LoopBackAuth.setUser($window.localStorage.getItem('accessTokenId'),response.data.id,response.data);
        // $scope.$apply('username='+response.data.name);
        // $scope.$apply();
        // console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
    window.logout = function(){
      $http({
        method: 'POST',
        url: '/api/taxiGoUsers/logout',
        headers: {
          Authorization: $window.localStorage.getItem('accessTokenId')
        }
      }).then(function resolveCallback(res){
        },function rejectCallback(res){});
        $window.localStorage.removeItem('accessTokenId');
        window.location.href = 'login.html';
    };
  }
  $scope.username =  $window.localStorage.getItem('posters_galore_login');
}])