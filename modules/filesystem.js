var readdir = require('fs').readdir

function waitForFiles( path , callback ){
    
    var allFilesPresent
    var interval
    interval = setInterval( () => {

        readdir(path , function(err,filesInFolder){

            if(filesInFolder.length >= 4)
            {
                clearInterval(interval)
                callback()
            }
        })

    },10)
}

module.exports.waitForFiles        = waitForFiles
module.exports.readFile            = require('fs').readFileSync
module.exports.writeFile           = require('fs').writeFileSync
