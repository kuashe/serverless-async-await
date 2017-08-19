var glob = require('glob')

function listFilesToTranspile(path , exclude){

    var ignoredFiles = ["node_modules/**", "__build__/**" ]
    ignoredFiles     = ignoredFiles.concat(exclude)

    var files = glob.sync('**/*.js', { root : path , ignore : ignoredFiles })

    return files

}

function listFilesFoldersToCopy(path , exclude , obj){
    

    var filesFolderToCopy = []
    
    var ignoredFiles = ['*.js' , "node_modules/**" , "__build__/**"]
    //ignoredFiles.concat(exclude)

    var ignoredFolders = ['__build__/**', '.serverless/**']
   // ignoredFolders.concat(exclude)

    

    var files   = glob.sync('*.*',{ root : path , ignore : ignoredFiles   })

    var folders = glob.sync('*/', { root : path , ignore : ignoredFolders })

   


    filesFolderToCopy = filesFolderToCopy.concat(folders, files)


    return filesFolderToCopy    

}

module.exports.listFilesToTranspile   = listFilesToTranspile
module.exports.listFilesFoldersToCopy = listFilesFoldersToCopy