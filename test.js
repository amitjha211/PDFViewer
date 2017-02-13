var myApp = angular.module("myApp",[]);



myApp.directive("pdfViewer",function(){
    return {
        restrict : "E"
        ,scope : { file : "=file" }
        , templateUrl : 'views/pdfViewer.html'
        ,controller : function($scope){
            
            //variable declaration 
            $scope.currentPage = 1;
            $scope.totalPages = 0
            $scope.error =false;
            
            //End
            
            
            var _pdf = null; 
            
            
            var _loadPDF = function(){
                PDFJS.getDocument($scope.file).then(function(pdf) {
                    // you can now use *pdf* here
                    _pdf = pdf;
                    $scope.totalPages = _pdf.numPages;
                    _viewPage();
                    $scope.$apply();
                });  
            }
            
            $scope.$watch('file',function(){
                if(($scope.file || '') != '' )
                {
                    $scope.currentPage = 1;
                    _loadPDF();
                }
            });

            var _viewPage = function(){
                _pdf.getPage($scope.currentPage).then(function(page) {
                    // you can now use *page* here
                    var scale = 1.5;
                    var viewport = page.getViewport(scale);

                    var canvas = document.getElementById('the-canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    var renderContext = {
                        canvasContext: context,
                            viewport: viewport
                    };
                    page.render(renderContext);

                });
            }

            
            
            $scope.viewPage = function(){
                _viewPage();
            }
            
            
            $scope.reset = function(){
                $scope.currentPage = 1;
                _viewPage();
            }
            
            $scope.next = function(){
                $scope.currentPage += 1;
                _viewPage();
            }
            
            $scope.previous = function(){
                if($scope.currentPage == 1)
                {
                    alert("You are on the first page !")
                    return ;
                }

                $scope.currentPage -= 1;
                _viewPage();
            }
            
            
            
        }
        , link : function(element){
            
        }
    }
});


myApp.controller("pdfViewer_test",function($scope){

    
    $scope.title = "PDF Viewer Demo";
    $scope.currentFile = '';
    $scope.files = ['express-sample.pdf'
                    ,'grunt_pdf_version.pdf'
                    ,'grunt-sample.pdf'
                    ,'nodejs_express_framework.pdf'
                    ,'php_tutorial.pdf'];
    
    
    $scope.setFileName = function(sFileName)
    {
        if((sFileName || '') != '')
            $scope.currentFile = "pdfs/" + sFileName;
    }
   
});

