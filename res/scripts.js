var notepadApp = angular.module("notepadApp", []);

var BD = {
	"accounts": {"Bruno":"123","Poods":"dicks","Metal":"soufixe"},
	"paginas": ["Técnico", "Férias", "Aniversários", "Poker", "Dívidas"],
	"tipos": ["Amigo", "Aniversário", "Morada", "Empréstimo"],
};

var USER = null;	// shameless. must change dis


notepadApp.controller("loginCtrl", function($scope){
	$scope.loggedUser = null;
	$scope.loggedStatus = "You are not logged in";

	$scope.login = function(){
		var user = $scope.bdusername;
		var pass = $scope.bdpassword;
		
		$.ajax({
			url: "req/login.php",
			data: {user: user, pass: pass},
			dataType: "json",
			success: function(data){
				console.log(data[0]);
				if (data.length > 0){
					$scope.loggedUser = data[0];
					$scope.loggedStatus = "Logged in as " + $scope.loggedUser.nome;
					USER = $scope.loggedUser;
					$scope.$apply();
					alert("Boas " + $scope.loggedUser.nome + "! :)");
				} else{
					$scope.loggedUser = null;
					$scope.loggedStatus = "Login failed.";
					USER = $scope.loggedUser;
					$scope.$apply();
				}
			}
		});
	};
	
});

notepadApp.controller("pagesCtrl", function($scope){
	$scope.pages = BD["paginas"];
});


notepadApp.controller("typesCtrl", function($scope){
	$scope.types = BD["tipos"];
});





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
