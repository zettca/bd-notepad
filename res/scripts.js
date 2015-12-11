var notepadApp = angular.module("notepadApp", []);

notepadApp.service("logServ", ["$rootScope", function($rootScope){
	this.isUserLogged = false;
	this.loggedUser = null;
	this.loggedStatus = "You are not logged in!";
	
	this.login = function(user){
		this.isUserLogged = true;
		this.loggedUser = user;
		this.loggedStatus = "Logged in as " + this.loggedUser.nome;
		$rootScope.$emit('userLogEvent');
		console.log(this.loggedStatus);
	};
	
	this.logout = function(){
		this.isUserLogged = false;
		this.loggedUser = null;
		this.loggedStatus = "Logged out sucessfully.";
		$rootScope.$emit('userLogEvent');
		console.log(this.loggedStatus);
	};
	
	this.fail = function(){
		this.isUserLogged = false;
		this.loggedUser = null;
		this.loggedStatus = "Login failed!";
		$rootScope.$emit('userLogEvent');
		console.log(this.loggedStatus);
	};
	
}]);


notepadApp.controller("pagesCtrl", ["$rootScope", "$scope", "$http", "logServ", function($rootScope, $scope, $http, logServ){
	if (logServ.isUserLogged) loadPages();	// only if session stuff?
	$rootScope.$on('userLogEvent', loadPages);
	$rootScope.$on('bdUpdate', loadPages);
	
	function loadPages(){
		var user = logServ.loggedUser;
		console.log("Loading Pages for " + user.nome);
		$http.get("req/select_pages.php", {params: {uid: user.userid}}).success(function(data){
			console.log("Found " + data.pages.length + " Pages...");
			$scope.pages = (data.success && data.pages.length > 0) ? data.pages : [];
		});
	}
	
	$scope.loadRecords = function(){
		var pid = $scope.selectedPage;
		console.log("Loading Records for pageid=" + pid);
		$http.get("req/select_page_records.php", {params: {pid: pid}}).success(function(data){
			console.log("Found " + data.records.length + " records...");
			$scope.records = (data.success && data.records.length > 0) ? data.records : [];
		});
	};
	
	$scope.delPage = function(pageID){
		console.log("Deleting page " + pageID);
		$http.get("req/delete_page.php", {params: {uid: logServ.loggedUser.userid, pid: pageID}}).success(function(data){
			console.log(data);
			loadPages();
		});
	};
	
}]);


notepadApp.controller("typesCtrl", ["$rootScope", "$scope", "$http", "logServ", function($rootScope, $scope, $http, logServ){
	if (logServ.isUserLogged) loadTypes();	// only if session stuff?
	$rootScope.$on('userLogEvent', loadTypes);
	$rootScope.$on('bdUpdate', loadTypes);

	function loadTypes(){
		var user = logServ.loggedUser;
		console.log("Loading Types for " + user.nome);
		$http.get("req/select_types.php", {params: {uid: user.userid }}).success(function(data){
			console.log("Found " + data.types.length + " types...");
			$scope.types = (data.types.length > 0) ? data.types : [];
		});
	}
	
	$scope.loadFields = function(){
		var tid = $scope.selectedType;
		console.log("Loading Fields for type=" + tid);
		$http.get("req/select_type_fields.php", {params: {tid: tid}}).success(function(data){
			console.log("Found " + data.fields.length + " fields...");
			$scope.fields = (data.success && data.fields.length > 0) ? data.fields : [];
		});
	};
	
	$scope.delType = function(typeID){
		console.log("Deleting type " + typeID);
		$http.get("req/delete_type.php", {params: {uid: logServ.loggedUser.userid, tid: typeID}}).success(function(data){
			console.log(data);
			loadTypes();
			$scope.loadFields();
		});
	};
	
	$scope.delField = function(fieldID){
		console.log("Deleting field " + fieldID);
		$http.get("req/delete_type_field.php", {params: {uid: logServ.loggedUser.userid, cid: fieldID}}).success(function(data){
			console.log(data);
			loadTypes();
			$scope.loadFields();
		});
	};
	
}]);





/* FORMS STUFF */

notepadApp.controller("loginCtrl", ["$scope", "$http", "logServ", function($scope, $http, logServ){
	$scope.log = logServ;
	
	$scope.login = function(){
		var par = {};
		if ($scope.bdid){
			par = { id: $scope.bdid };
		} else if ($scope.bdusername && $scope.bdpassword){
			par = { user: $scope.bdusername, pass: $scope.bdpassword };
		} else{
			par = { id: 9999 };
		}
		
		console.log(par);
		
		$http.get("req/login.php", { params: par }).success(function(data){
			console.log(data);
			if (data.success){
				logServ.login(data.user);
			} else{
				logServ.fail();
			}
		});
	};
	
	$scope.logout = function(){
		logServ.logout();	
	};
	
}]);




notepadApp.controller("addPagesFormCtrl", ["$rootScope", "$scope", "$http", "logServ",  function($rootScope, $scope, $http, logServ){

	$scope.add = function(){
		console.log("Adding new Page!");
		var par = { uid: logServ.loggedUser.userid, name: $scope.bdpage };
		console.log(par);
		$http.get("req/insert_page.php", { params: par }).success(function(data){
			$rootScope.$emit('bdUpdate');
			$scope.bdpage = "";
		});
	};

}]);

notepadApp.controller("addRecordsPageFormCtrl", ["$rootScope", "$scope", "$http", "logServ",  function($rootScope, $scope, $http, logServ){

	$scope.add = function(){
		console.log("Adding new page Record!");
		var par = { uid: logServ.loggedUser.userid, pid: $scope.selectedPage, tid: 0, name: $scope.bdrecord };
		console.log(par);
		$http.get("req/insert_page_record.php", { params: par }).success(function(data){
			$rootScope.$emit('bdUpdate');
			$scope.bdrecord = "";
		});
	};

}]);


notepadApp.controller("addTypesFormCtrl", ["$rootScope", "$scope", "$http", "logServ",  function($rootScope, $scope, $http, logServ){

	$scope.add = function(){
		console.log("Adding new Type!");
		var par = { uid: logServ.loggedUser.userid, name: $scope.bdtype };
		console.log(par);
		$http.get("req/insert_type.php", { params: par }).success(function(data){
			$rootScope.$emit('bdUpdate');
			$scope.bdtype = "";
		});
	};

}]);

notepadApp.controller("addFieldsTypeFormCtrl", ["$rootScope", "$scope", "$http", "logServ",  function($rootScope, $scope, $http, logServ){

	$scope.add = function(tid){
		console.log("Adding new type Field!");
		var par = { uid: logServ.loggedUser.userid, tid: $scope.selectedType, name: $scope.bdfield };
		console.log(par);
		$http.get("req/insert_type_field.php", { params: par }).success(function(data){
			$rootScope.$emit('bdUpdate');
			$scope.bdfield = "";
		});
	};

}]);

