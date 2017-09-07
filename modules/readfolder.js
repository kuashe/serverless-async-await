var glob = require('glob')

function listFilesToTranspile(path , exclude){

    var ignoredFiles = ["**/node_modules/**", "__build__/**" ]
    ignoredFiles     = ignoredFiles.concat(exclude)

    var files = glob.sync('**/*.js', { root : path , ignore : ignoredFiles })

    return files

}

function listFilesFoldersToCopy(path , exclude ){
    

    var filesFolderToCopy = []
    
    var ignoredFiles = ['*.js' , "node_modules/**" , "__build__/**"]
    //ignoredFiles.concat(exclude)

    var ignoredFolders = ['__build__/**', '.serverless/**']
   // ignoredFolders.concat(exclude)

    

    var files                 = glob.sync('*.*',{ root : path , ignore : ignoredFiles, nodir: true   })
    var filesWithNoName       = glob.sync('*'  ,{ root : path , ignore : ignoredFiles, nodir: true   })
    var filesWithDotExtension = glob.sync('.*'  ,{ root : path , ignore : ignoredFiles, nodir: true   })
    
    var folders = glob.sync('*/', { root : path , ignore : ignoredFolders })

   


    filesFolderToCopy = filesFolderToCopy.concat(folders, files , filesWithNoName , filesWithDotExtension)


    return filesFolderToCopy    

}

module.exports.listFilesToTranspile   = listFilesToTranspile
module.exports.listFilesFoldersToCopy = listFilesFoldersToCopy