var  readdir    = require('fs-extra').readdirSync
var  exec       = require('child_process').execSync
var resolvePath = require('path')

var unzip       = require('extract-zip')

describe('Serverless Async Await', function() {


    before( function(){

        exec('npm install' , { cwd : './project/'})
        exec('serverless package')

        var ProjectPath     = resolvePath('./' , 'project' )
        var slsFolder       = resolvePath( ProjectPath , '.serverless')
        var slsZip          = resolvePath( slsFolder , 'aws-nodejs.zip')
        var cloudFormationUpdateStack = resolvePath( slsFolder , 'cloudformation-template-update-stack.json')
        var serverlessState = resolvePath( slsFolder , 'serverless-state.json')
        var folderContent   = readdir(slsFolder) 
    })

    describe('.serverless', function() {



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

        it('should contain a zip with the project' , function(){


            unzip( slsZip , {dir : 'aws-nodejs'} , e => {

                if(e) throw e
                
                var unzipedProjectPath     = resolvePath(slsFolder , 'aws-nodejs')
                var unzipedProjectFolder   = readdir(unzipedProjectPath)

                var handlerExist = unzipedProjectFolder.indexOf('handler.js')
                var packageJsonExist = unzipedProjectFolder.indexOf('package.json')
                unzipedProjectFolder.indexOf('.')
                
            })

        }) 

    });
});


