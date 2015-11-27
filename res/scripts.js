var notepadApp = angular.module("notepadApp", []);

var BD = {
	"paginas": ["Técnico", "Férias", "Aniversários", "Poker", "Dívidas"],
	"tipos":
	{
		"Amigo": ["nome", "idade"],
		"Aniversário": ["nome", "data"],
		"Morada": ["rua", "porta"],
		"Empréstimo": ["nome", "valor", "data"]
	},
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
	$scope.types = Object.keys(BD["tipos"]);
});