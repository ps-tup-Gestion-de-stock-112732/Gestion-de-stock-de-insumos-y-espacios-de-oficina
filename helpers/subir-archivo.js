const { v4: uuidv4 } = require('uuid')
const path = require('path')
const xlsx = require('xlsx')
const fs = require('fs')

const subirArchivo = ( files, extensionesValidas = ['xlsx', 'jpg'], carpeta = '' ) =>{

    return new Promise((resolve, reject)=>{
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length -1]

        //Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${ extension } no es permitida - ${ extensionesValidas }`)
        }

        const nombretemp = uuidv4() + '.' + extension
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombretemp ) ;

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }

            const workbook = xlsx.readFile(uploadPath)
            const workbookSheets = workbook.SheetNames
            
            const sheet = workbookSheets[0]
            const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet])

            if (fs.existsSync(uploadPath)) {
                fs.unlinkSync(uploadPath)
            }

            resolve(dataExcel)
        }); 
    })
}

module.exports = {
    subirArchivo
}