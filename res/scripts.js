var notepadApp = angular.module("notepadApp", []);

var BD = {
	"accounts": {"Bruno":"123","Poods":"dicks","Metal":"soufixe"},
	"paginas": ["Técnico", "Férias", "Aniversários", "Poker", "Dívidas", "abc", "def", "chfd"],
	"tipos": ["Amigo", "Aniversário", "Morada", "Empréstimo"],
	"registos":
	[
		{
			"nome": "Bruno",
			"pagina": "Aniversários",
			"tipo": "Aniversário",
			"campos":
			{
				"nome": "Bruno",
				"data": "1995-07-27"
			}
		},
		{
			"nome": "Joel",
			"pagina": "Aniversários",
			"tipo": "Aniversário",
			"campos":
			{
				"nome": "Joel",
				"data": "1995-12-12"
			}
		},
	]
};


notepadApp.controller("pagesCtrl", function($scope){
	$scope.pages = BD["paginas"];
});


notepadApp.controller("typesCtrl", function($scope){
	$scope.types = BD["tipos"];
});

notepadApp.controller("pagesFormCtrl", function($scope){
	$scope.pages = BD["paginas"];

	$scope.add = function(page){
		$scope.pages.push(page);
		console.log("added " + page);
	};

	$scope.del = function(page){
		$scope.pages.splice(page, 1);
	};
});

notepadApp.controller("typesFormCtrl", function($scope){
	$scope.types = BD["tipos"];

	$scope.add = function(type){
		$scope.types.push(type);
		console.log("added " + type);
	};

	$scope.del = function(type){
		$scope.types.splice(type, 1);
	};
});
