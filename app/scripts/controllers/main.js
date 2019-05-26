'use strict';

/**
 * @ngdoc function
 * @name previewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the previewApp
 */
angular.module('previewApp')
  .controller('MainCtrl', function ($scope, $http, $window, $sce) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.extensao = '';

    $scope.uploadImagem = function (element) {
      var photofile = element.files[0];
      var reader = new FileReader();

      $scope.files = []
      $scope.files.push(element.files[0])

      $scope.extensao = element.files[0].name;
      $scope.type = '';
      console.log($scope.extensao);

      reader.onload = function (e) {
        $scope.imagem = e.target.result;
        $scope.$apply();
      };
      reader.readAsDataURL(photofile);
    };


    function dataURItoBlob(dataURI) {

      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    }

    $scope.showImage = function () {

      $scope.extensao = '';
      var imagem = $scope.imagem;

      if (imagem.toLowerCase().indexOf('image/jpeg') > 0) {
        $scope.type = 'image/jpeg';
        $scope.extensao = '.jpg';
      } else
        if (imagem.toLowerCase().indexOf('image/png') > 0) {
          $scope.type = 'image/png';
          $scope.extensao = '.png';
        } else
          if (imagem.toLowerCase().indexOf('application/pdf') > 0) {
            $scope.type = 'application/pdf';
            $scope.extensao = '.pdf';
          }
          // not working yet 
          else if (imagem.toLowerCase().indexOf('application/msword') > 0) {
              $scope.type = 'application/msword';
              $scope.extensao = '.doc';
            } else {
              $scope.type = 'application/octet-stream';
              $scope.extensao = '.docx';
            }

      var decodedImage = dataURItoBlob(imagem);
      var blob = new Blob([decodedImage], { type: $scope.type });
      var fileURL = URL.createObjectURL(blob);
      $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);

    }
  });
