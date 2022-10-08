const bronModel = require('../../models/bron.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fullproductModel = require('../../models/fullproduct.model');
const moment = require('moment');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class bronController {
    getOne = async (req, res, next) =>{
        const model = await bronModel.findAll({
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
        const model = await bronModel.findAll({raw: true});
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data:{"visit": model}
        })
    }
    create = async(req, res, next) => {
        let a = new Date();
        let x = moment(a).format('YYYY-MM-DDTHH:mm:ss')
        const {items, ...data } = req.body;
        this.checkValidation(req);
        await bronModel.create({
            "storeid": data.storeid,
            "kurs": data.kurs,
            "currency": data.currency,
            "client": data.client,
            "saboy": data.saboy,
            "summa": data.summa,
            "oplate": data.oplate,
            "summaNalichniy":data.summaNalichniy,
            "summaPlastik": data.summaPlastik,
            "summaDostavka": data.summaDostavka,
            "summaSkidka":data.summaSkidka,
            "skidkaFoiz": data.skidkaFoiz,
            "lon": data.lon,
            "lat": data.lat,
            "comment": data.comment,
            "adres": data.adres,
            "kg": data.kg,
            "date": x
        });
        for(let i = 0; i < items.length; i++ ){
            await fullproductModel.destroy({
                where:{
                    id: items[i].product
                }
            })
        }
        res.send({
            error: false,  
            error_code: 0,
            message: 'Malumotlar qo\'shildi',
            data: false
        });
    }

    update = async (req, res, next) =>{
            const model = await bronModel.scope('withoutPassword').findOne({
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
        const model = await bronModel.destroy({
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
module.exports = new bronController;