    
    var app = angular.module('myApp',['ngCookies','ngMaterial','ngMessages','ngFileUpload']);
    app.controller('form_controller', function ($scope, $http, $mdDialog, $filter,Upload) {
    	$scope.start = function() {
    		$scope.search_alert = '';
    		$http({
                method : 'POST',
                url : "src/take_info.php"
             })
                .then(function(response){
                	if(response.data['status']==0){
                        $scope.status = response.data;
                        $scope.data = $scope.status.data;
                        $scope.data.forEach(function(person) {
							$scope.item = person;
							$scope.item.age = $scope.age_math($scope.item.date_of_birth);
							if($scope.item.local == 1) {
								$scope.item.local = true;
							} else if($scope.item.local == 0){
								$scope.item.local = false;
							}
							
							return $scope.item;
						});
                    }
                	
                })
    	}
    	
    	$scope.start();
    	$scope.get_jobs = function() {
    		$http({
                method : 'POST',
                url : "src/get_jobs.php"
             })
                .then(function(response){

                	if(response.data['status']==0){

                        $scope.status = response.data;
                        $scope.jobs = $scope.status.data;
                    

                    }
                	
                })
    	}
    	$scope.get_jobs();

    	$scope.select = true;
        $scope.selecting = function(id) {
        	$scope.selected_person = id;
        	$scope.select = false;
        	
        }

        
		$scope.add_edit_person = function(ev, input) {
		
			
			if(ev.path[0].id == 2 && input != undefined) {
				let data = $scope.data;
				data.forEach(function(person) {

					if(JSON.stringify(person.id) == JSON.stringify(input)){
						$scope.item = person;
						$scope.item.age = $scope.age_math($scope.item.date_of_birth);
						
						return $scope.item;
						
						
					
					} 
				});
			} else {
				$scope.item = {
					name:'',
					sec_name:'',
					img:'standart.jpg',
					date_of_birth:'',
					job:'',
					local:'',
					adress:'',
					id:''
				};
			}
			
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'src/modal.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      locals: {
           item: $scope.item,
           jobs: $scope.jobs,
       
         	},
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen
	    })
	    .then(function(answer) {

	    	$scope.item.date_of_birth = $filter('date')($scope.item.date_of_birth,('yyyy-MM-dd'));
	    	$scope.item.age = $scope.age_math($scope.item.date_of_birth);
	    	if(ev.path[0].id == 2) {
	    	
	    		if(answer == 'new_avatar') {
	    			$scope.avatar_dialog();
	    		}
	    		if(answer == 'delete_avatar') {
	    			$scope.delete_avatar();
	    		}
	
	    		$scope.out_info($scope.item);
	    		
	    		

	    	} else {
	    		$scope.add_person(answer);
	    		$scope.data.push($scope.item);
	    	}
	    }, function() {
	
	    });
	  };
      $scope.jobs ='';

       $scope.avatar_dialog = function(ev) {
		    $mdDialog.show({
		      	contentElement: '#avadia',
		     	parent: angular.element(document.body),
		      	targetEvent: ev,
		      	clickOutsideToClose: true
		    });
  		};

	  	$scope.out_info = function(info) {
	  		$http({
                method : 'POST',
                url : "src/out_info.php",
                data : {
                	'data':info
                }
             })
                .then(function(response){
              
                	if(response.data['status']==0){
                        $scope.status = response.data;
                    }
                	
                })
	  	};

	  	$scope.add_person = function(person_info) {
	  		$http({
                method : 'POST',
                url : "src/add_person.php",
                data : {
                	'data':person_info
                }
             })
                .then(function(response){
                
                	if(response.data['status']==0){
                        $scope.status = response.data;
                        $scope.item.id = $scope.status.id[0]['LAST_INSERT_ID()'];
                    }
                	
                })
	  	};
	  	$scope.delete_person = function(ev,person_id) {
	  		$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'src/delete_person.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      locals: {
           		item: person_id,
           		jobs: $scope.jobs,
           		
         	  },
		      clickOutsideToClose:true,
		      fullscreen: $scope.customFullscreen 
		    })
		    .then(function(answer) {
		    	$http({
                method : 'POST',
                url : "src/delete_person.php",
                data : {
                	'data':person_id
                }
             })
                .then(function(response){
                	if(response.data['status']==0){
                        $scope.status = response.data;
                    }
                	
                })
                $scope.data = $scope.data.filter(function(item) { 
   					return item.id !== person_id;
				})
				$scope.select = true; 	
				$scope.selected_person = '';
		    	
		    }, function() {
		    });
	  		
	  	}
        function DialogController($scope, $mdDialog, item, jobs) {
        	$scope.item = item; 
        	$scope.jobs = jobs;
        	
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.answer = function(answer) {
		      $mdDialog.hide(answer);
		    };
		}
		$scope.actived_sort = '';
		$scope.sort = function(ev) {
			let path_name = ev.path[0].attributes.name.value;
			if($scope.actived_sort != path_name) {
				$scope.data.sort(function(a, b){
					if (a[path_name] > b[path_name]) {
					   return 1;
				 	}
					if (a[path_name] < b[path_name]) {
					   return -1;
					}
					  // a должно быть равным b
					return 0;
				});
				$scope.actived_sort = path_name;
			} else if($scope.actived_sort == path_name) {
				$scope.data.sort(function(a, b){
					if (a[path_name] > b[path_name]) {
					   return -1;
				 	}
					if (a[path_name] < b[path_name]) {
					   return 1;
					}
					  // a должно быть равным b
					return 0;
				});
				$scope.actived_sort = '';
			}
		
			
			

			
 


		}


		$scope.age_math = function(birthday) { 
		    var ageDifMs = Date.now() - new Date(birthday);
		    var ageDate = new Date(ageDifMs); 
		    return Math.abs(ageDate.getUTCFullYear() - 1970);
		}
		
		$scope.search_person = function(ev,source) {
			if(ev.keyCode == 13 || source) {
				if($scope.search != undefined){
				$scope.search_alert = '';
				 $scope.data = $scope.data.filter(function(item) { 
				 	var name = item.name;
				 	var sec_name = item.sec_name;
				 	var adress = item.adress;
				 	name = name.replace(name, name.toLowerCase());
				 	sec_name = sec_name.replace(sec_name, sec_name.toLowerCase());
				 	adress = adress.replace(adress, adress.toLowerCase());
				 	$scope.search = $scope.search.replace($scope.search[0], $scope.search[0].toLowerCase());
					if(name == $scope.search) {
				 		return item.name;
				 	}
				 	if(sec_name == $scope.search) {
				 		return item.sec_name;
				 	}
				 	if(adress == $scope.search || adress.indexOf($scope.search) != -1) {
				 		return item.adress;
				 	}
				});
				} else {
					$scope.search_alert = 'Поиск пуст!';
				}
			}
			

		}

		$scope.upload_avatar = function (file) {
            Upload.upload({
            	
                url: "src/new_avatar.php",
                data: {
                	file: file,
                	id:$scope.selected_person
					}
            }).then(function (resp) {
                window.location = window.location.href;
            });
         
        }

        $scope.delete_avatar = function (id) {
            $http(
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined,
                    },
                    url: 'src/del_ava.php',
                    data:{
                        id:$scope.selected_person
                    }
                }
            )
        .then(function (response) {
              window.location = window.location.href;
            });
        }






    })