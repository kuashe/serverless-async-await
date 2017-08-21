
const { readFile , writeFile , waitForFiles }            = require('./modules/filesystem.js')
const { createDirectory , copy , remove }                = require('./modules/fsextra.js')
const { resolvePath }                                    = require('./modules/path.js')
const { asyncAwaitTranspile }                            = require('./modules/transpile.js')
const { listFilesFoldersToCopy , listFilesToTranspile }  = require('./modules/readfolder.js')


class ServerlessPlugin 
{

  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.originalServicePath = ''


    this.commands = {
      "async-await": {
        usage: 'Transpile async await code to Node 0.12 and higher',
        options: {
          message: {
            usage:
              ''
          },
        },
      },
    };

    this.hooks = {
      'before:package:createDeploymentArtifacts' : this.transpileProject.bind(this),
      'after:package:createDeploymentArtifacts' : this.cleanup.bind(this),
      'before:deploy:function:packageFunction': this.transpileProject.bind(this),
      'after:deploy:function:packageFunction': this.cleanup.bind(this),
    };
  }





  transpileProject() 
  {

    var pluginOutputPath   = resolvePath(__dirname , '..','..', '__build__')
    var projectPath        = resolvePath(__dirname , '..' , '..')
    
    var filesToTranspile     = []
    var filesFolderToCopy    = []

    var code                 = ''
    var sourceCodePath       = ''

    var transpiledCode       = ''
    var transpiledFilePath   = ''

    var fileFolderSourcePath  = ''
    var sourceFileFoldersPath = ''
    var fileFolderCopyPath    = ''
    
    this.serverless.cli.log('Transpiling Async Await...')

    createDirectory(pluginOutputPath)
    
    
    filesToTranspile  =  listFilesToTranspile( projectPath , [] )
    filesFolderToCopy =  listFilesFoldersToCopy(projectPath , [] )

   
    for(var fileFolder of filesFolderToCopy )
    {
      

      sourceFileFoldersPath = resolvePath(projectPath , fileFolder)
      fileFolderCopyPath    = resolvePath(pluginOutputPath , fileFolder)

      copy( sourceFileFoldersPath , fileFolderCopyPath )
    }



    for(var file of filesToTranspile)
    {
        
        sourceCodePath     = resolvePath(projectPath , file)
        transpiledFilePath = resolvePath(pluginOutputPath , file)

        code               = readFile(sourceCodePath , "UTF-8")
        transpiledCode     = asyncAwaitTranspile(code) 

        writeFile( transpiledFilePath , transpiledCode)  
    }

    this.serverless.config.servicePath = pluginOutputPath 

  }


  cleanup() 
  {
    
    var serverlessFolder      = resolvePath( __dirname , '..' , '..' , '.serverless/')
    var serverlessBuildFolder = resolvePath( __dirname ,'..' , '..' , '__build__' , '.serverless')
    var pluginOutputPath      = resolvePath( __dirname ,'..' , '..' , '__build__/' )


    waitForFiles(serverlessBuildFolder ,  () => {

             copy(serverlessBuildFolder , serverlessFolder) 
             remove(pluginOutputPath)
    })

  }

}

module.exports = ServerlessPlugin;
