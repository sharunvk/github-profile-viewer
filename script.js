angular.module("MyApp", ['ngMaterial', 'ngRoute'])
    .controller("inputController", function ($scope, $http) {
        $scope.searchUser = () => {
            const options = {
                method: "GET",
                url: `https://api.github.com/search/users?q=${$scope.user}`,
                headers: {
                    Authorization: "Bearer " + "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",
                },
            };
            $scope.usersArray = [];
            $http(options)
                .then((response) => {
                    $scope.usersArray = response.data.items;
                    $scope.usersArray.forEach((element, index) => {
                        const singleUserOptions = {
                            method: "GET",
                            url: `http://api.github.com/users/${element.login}`,
                            headers: {
                                Authorization: "Bearer " + "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",
                            },
                        }
                        $http(singleUserOptions)
                            .then((detailedData) => {
                                let detailedUserData = detailedData.data;
                                $scope.usersArray[index] = {...$scope.usersArray[index], ...detailedUserData};
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        $scope.clearInput = () => {
            $scope.user = "";
            $scope.usersArray = [];
        }
    });