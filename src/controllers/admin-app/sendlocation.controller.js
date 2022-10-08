const sendLocationModel = require('../../models/sendlocation.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bronModel = require('../../models/bron.model')
const bcrypt = require('bcryptjs');
const { sequelize } = require('../../models/sendlocation.model');
const moment = require('moment');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class sendLocationController {
    getOne = async (req, res, next) =>{
        const model = await sendLocationModel.findAll({
            raw: true
        })
        if(!model){
            throw new HttpException(404, "bu id da malumot yo\'q")
        }
        res.status(200).send({
            error: false,
            error_code: 0,
            message: 'Hatolik mavjud emas',
            data: model
        });
    }
    getAll = async (req, res, next) => {
        const model = await sendLocationModel.findAll({raw: true});
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data:{"visit": model}
        })
    }
    sendLocation = async(req, res, next) => {
        let datetime1 = req.query.date1;
        let datetime2 = (req.query.date2);
        let store = req.query.storeid;
        const model = await bronModel.findAll({
            attributes:[ 'date', 'client', 'currency',
                [sequelize.literal(`SUM(CASE WHEN bron.date >= ` + datetime1 + ` and bron.date <= ` + datetime2 + ` AND bron.storeid = ${store} THEN bron.summa ELSE 0 END)`), 'summaa']
            ]
        })
        res.send({
            "error": false,
            "error_code": 200,
            "message": " ",
            data: model
        })
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
     await sendLocationModel.create({
            "batteryLevel": req.body.batteryLevel,
            "lat": req.body.lat,
            "lon": req.body.lon
        });
        res.send({
            error: false,  
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: true
        });
    }

    update = async (req, res, next) =>{
            const model = await sendLocationModel.scope('withoutPassword').findOne({
                where:{
                    id: req.params.id
                }
            })
            model.name = req.body.name,
            model.productcount = req.body.productcount,
            model.image = req.body.image,
            model.top = req.body.top
        model.save();
        res.status(200).send({
            error: false,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await sendLocationModel.destroy({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, "bunday id yoq")
        }
        else{
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot ochirildi',
            data: model
        });
    }
    }
    checkValidation = (req) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
    
}

// console.log(VerifyToken);



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new sendLocationController;