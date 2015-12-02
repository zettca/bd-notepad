var notepadApp = angular.module("notepadApp", []);

var BD = {
	"accounts": {"Bruno":"123","Poods":"dicks","Metal":"soufixe"},
	"paginas": ["Técnico", "Férias", "Aniversários", "Poker", "Dívidas"],
	"tipos": ["Amigo", "Aniversário", "Morada", "Empréstimo"],
};

var USER = null;	// shameless. must change dis


notepadApp.service("log", function(){
	this.isLogged = false;
	this.loggedUser = null;
	this.loggedStatus = "You are not logged in!";
	
	this.login = function(user){
		this.isLogged = true;
		this.loggedUser = user.nome;
		this.loggedStatus = "Logged in as " + this.loggedUser + "...";
	};
	
	this.fail = function(){
		this.isLogged = false;
		this.loggedUser = null;
		this.loggedStatus = "Login failed!";
	};
	
	this.getLogStatus = function(){
		return this.loggedStatus;
	};
	
});


notepadApp.controller("loginCtrl", ["$scope", "$http", "log", function($scope, $http, log){
	$scope.loggedStatus = log.loggedStatus;
	
	$scope.login = function(){
		var user = $scope.bdusername;
		var pass = $scope.bdpassword;
		
		$http.get("req/login.php", {params: {user: user, pass: pass}}).success(function(data){
			console.log(data[0]);
			if (data.length > 0){
				log.login(data[0]);
			} else{
				log.fail();
			}
			$scope.loggedStatus = log.getLogStatus();
		});
	};

	
}]);

notepadApp.controller("pagesCtrl", ["$scope", "$http", "log", function($scope, $http, log){
	$scope.pages = BD["paginas"];
	//$scope.userID = log.loggedUser.userid;
	
	//if ($scope.userID){
		$http.get("req/hack.php", {params: {query: "SELECT * FROM pagina WHERE userid=43"}}).success(function(data){
			console.log(data);
			if (data.length > 0){
				$scope.pages = data;
			} else{
				$scope.pages = BD["paginas"];
			}
		});
	//}
	
}]);


notepadApp.controller("typesCtrl", ["$scope", "$http", "log", function($scope, $http, log){
	$scope.types = BD["tipos"];
	
	//if (log.isLogged){
		$http.get("req/hack.php", {params: {query: "SELECT * FROM tipo_registo WHERE userid=43"}}).success(function(data){
			console.log(data);
			if (data.length > 0){
				$scope.types = data;
			} else{
				$scope.types = BD["tipos"];
			}
		});
	//}
}]);

notepadApp.controller("recordCtrl", ["$scope", "$http", "log", function($scope, $http, log){
	$scope.records = [];
	
	//if (log.isLogged){
		$http.get("req/hack.php", {params: {query: "SELECT * FROM ist178013.tipo_registo WHERE userid=43 AND ativo=1"}}).success(function(data){
			console.log(data);
			if (data.length > 0){
				$scope.records = data;
			} else{
				$scope.records = [];
			}
		});
	//}
}]);




notepadApp.controller("pagesFormCtrl", function($scope){
	$scope.pages = BD["paginas"];

	$scope.add = function(){
		$scope.pages.push($scope.bdpage);
	};

	$scope.del = function(){
		$scope.pages.splice($scope.bdpage, 1);
	};
});

notepadApp.controller("typesFormCtrl", function($scope){
	$scope.types = BD["tipos"];

	$scope.add = function(){
		$scope.types.push($scope.bdtype);
	};

	$scope.del = function(){
		$scope.types.splice($scope.bdtype, 1);
	};
});
