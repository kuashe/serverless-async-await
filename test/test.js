var  readdir    = require('fs-extra').readdirSync
var readStream   = require('fs').createReadStream
var readFile   = require('fs').readFileSync
var  exec       = require('child_process').execSync
var resolvePath = require('path').join
var assert      = require('assert')
var unzip       = require('unzip')



//exec('serverless package', { cwd  : './test/project/'})


describe('Serverless Async Await', function() {




    describe('.serverless', function() {

        

        var ProjectPath                 = resolvePath( __dirname , 'project' )
        var slsFolder                   = resolvePath( ProjectPath , '.serverless')//unzip before 
        var slsZip                      = resolvePath( slsFolder , 'aws-nodejs.zip')
        var cloudFormationUpdateStack   = resolvePath( slsFolder , 'cloudformation-template-update-stack.json')
        var serverlessState             = resolvePath( slsFolder , 'serverless-state.json')
        
        var unzipedProjectPath           = resolvePath(slsFolder , 'aws-nodejs')
        var modelsPath                   = resolvePath(unzipedProjectPath , 'models')
    
        var unzipedProjectFolder        = readdir(ProjectPath)
        var folderContent               = readdir(slsFolder) 
        var unzipedProjectFolder        
        var unzipedModelFolder          

        readStream(slsZip).pipe( unzip.Extract({ path: './test/project/.serverless/aws-nodejs' }) )

        it('should contain a zip in .serverless folder', function() {

            var zipExist = folderContent.indexOf('aws-nodejs.zip') != -1
            assert.equal( zipExist , true );
        
        })

        it('should contain cloudformation-template-create-stack.json' , function(){

            var cloudFormationCreateExist = folderContent.indexOf('cloudformation-template-create-stack.json') != -1
            assert.equal( cloudFormationCreateExist , true );

        })

        it('should contain cloudformation-template-update-stack.json', function() {
                      
            var cloudFormationUpdateExist = folderContent.indexOf('cloudformation-template-update-stack.json') != -1
            assert.equal( cloudFormationUpdateExist , true );

        })

        it('should contain a serverless-state.json' , function(){
                        
            var serverlessStateExit = folderContent.indexOf('serverless-state.json') != -1
            assert.equal( serverlessStateExit , true );

        })

        

        it('should contain a zip with the project inside' , function(){

            

            unzipedProjectFolder        = readdir(unzipedProjectPath)
            unzipedModelFolder          = readdir(modelsPath)

            var handlerExist     = unzipedProjectFolder.indexOf('handler.js') != -1
            var packageJsonExist = unzipedProjectFolder.indexOf('package.json') != -1
            var txtExist         = unzipedProjectFolder.indexOf('.txt') != -1
            var modelFolderExist = unzipedProjectFolder.indexOf('models') != -1
            var gitignoreExist   = unzipedProjectFolder.indexOf('.gitignore') != -1
            
            var fetchModelExist  =  unzipedModelFolder.indexOf('fetch.js')
            
            var allFilesExist = handlerExist == packageJsonExist == txtExist == modelFolderExist == gitignoreExist == fetchModelExist == true

            assert(allFilesExist , true)
            
        }) 

        it('should contain transpiled javascript files' , function(done){

            var transpiledHandlerPath       = resolvePath( unzipedProjectPath , 'handler.js')
            var transpiledFetchPath         = resolvePath( modelsPath , 'fetch.js')
            var transpiledHandlerRefPath    = resolvePath( 'test' , 'ref' , 'handler.js')
            var transpiledFetchRefPath      = resolvePath( 'test', 'ref' , 'fetch.js')

            var handlersAreTranspiled    = readFile(transpiledHandlerPath).toString() == readFile(transpiledHandlerRefPath).toString()

            var fetchModelsAreTranspiled = readFile(transpiledFetchPath).toString()   == readFile(transpiledFetchRefPath)

            var allFilesAreTranspiled    = handlersAreTranspiled == fetchModelsAreTranspiled == true

            assert(allFilesAreTranspiled , true)
            done()

        })

        it('should not contain __build__ folder' , function(){

            var projectFolder = readdir(ProjectPath)
            assert(projectFolder.indexOf('__build__') == -1 , true)            

        })
    });
});


