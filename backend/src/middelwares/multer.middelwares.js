import multer from 'multer'


const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./public/temp')
    },
    filname:function (req,file,cb){
        cb(null,file.orginalname)
    }
})

export const upload=multer({
    storage:storage
})