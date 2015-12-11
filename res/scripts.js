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
	
	function loadPages(){
		var user = logServ.loggedUser;
		console.log("Updating Pages for " + user.nome);
		$http.get("req/select_pages.php", {params: {uid: user.userid}}).success(function(data){
			console.log("Found " + data.pages.length + " Pages...");
			$scope.pages = (data.success && data.pages.length > 0) ? data.pages : [];
		});
	}
	
	$scope.loadRecords = function(){
		var pid = $scope.selectedPage;
		console.log("Updating Records for pageid=" + pid);
		$http.get("req/select_page_records.php", {params: {pid: pid}}).success(function(data){
			console.log("Found " + data.records.length + " tecords...");
			$scope.records = (data.success && data.records.length > 0) ? data.records : [];
		});
	};
	
}]);


notepadApp.controller("typesCtrl", ["$rootScope", "$scope", "$http", "logServ", function($rootScope, $scope, $http, logServ){
	if (logServ.isUserLogged) loadTypes();	// only if session stuff?
	$rootScope.$on('userLogEvent', loadTypes);

	function loadTypes(){
		var user = logServ.loggedUser;
		console.log("Updating Types for " + user.nome);
		$http.get("req/hack.php", {params: {query: "SELECT * FROM tipo_registo WHERE userid="+user.userid}}).success(function(data){
			console.log("Found " + data.length + " types...");
			$scope.types = (data.length > 0) ? data : [];
		});
	}
	
	$scope.loadFields = function(){
		var tid = $scope.selectedType;
		console.log("Updating Fields for pageid=" + tid);
		$http.get("req/select_type_fields.php", {params: {tid: tid}}).success(function(data){
			console.log("Found " + data.fields.length + " fields...");
			$scope.fields = (data.success && data.fields.length > 0) ? data.fields : [];
		});
	};
	
}]);

/*notepadApp.controller("recordCtrl", ["$rootScope", "$scope", "$http", "logServ", function($rootScope, $scope, $http, logServ){
	if (logServ.isUserLogged) loadRecords();	// only if session stuff?
	$rootScope.$on('userLogEvent', function(){ loadRecords(); });
	
	function loadRecords(user){
		user = logServ.loggedUser;
		console.log("Updating Records for " + user.nome);
		$http.get("req/hack.php", {params: {query: "SELECT * FROM tipo_registo WHERE userid="+user.userid}}).success(function(data){
			console.log("Found " + data.length + " Records...");
			$scope.records = (data.length > 0) ? data : [];
		});
	}
	
}]);*/





/* FORMS STUFF */

notepadApp.controller("loginCtrl", ["$scope", "$http", "logServ", function($scope, $http, logServ){
	$scope.log = logServ;
	
	$scope.login = function(){
		var prams = {};
		if ($scope.id)
			prams = {user: $scope.bdusername, pass: $scope.bdpassword, id: $scope.bdid};
		else
			prams = {user: $scope.bdusername, pass: $scope.bdpassword, id: $scope.bdid};
		console.log(prams);
		$http.get("req/login.php", {params: prams}).success(function(data){
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

notepadApp.controller("pagesFormCtrl", function($scope){
	$scope.pages = [];

	$scope.add = function(){
		if ($scope.bdpage){
			$scope.pages.push($scope.bdpage);
			console.log($scope.pages);
			$scope.bdpage = "";
		}
	};

	$scope.del = function(){
		$scope.pages.splice($scope.bdpage, 1);
	};
});

notepadApp.controller("typesFormCtrl", function($scope){
	$scope.types = [];

	$scope.add = function(){
		if ($scope.bdtype){
			$scope.types.push($scope.bdtype);
			console.log($scope.types);
			$scope.bdtype = "";
		}
	};

	$scope.del = function(){
		$scope.types.splice($scope.bdtype, 1);
	};
});

notepadApp.controller("recordsFormCtrl", function($scope){
	$scope.records = [];

	$scope.add = function(){
		if ($scope.bdrecord){
			$scope.records.push($scope.bdrecord);
			console.log($scope.records);
			$scope.bdrecord = "";
		}
	};

	$scope.del = function(){
		$scope.records.splice($scope.bdrecord, 1);
	};
});