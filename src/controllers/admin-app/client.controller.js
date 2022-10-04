const clientModel = require('../../models/client.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class clientController {
    getOne = async (req, res, next) =>{
        const model = await clientModel.findAll({
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
        const model = await clientModel.findAll({raw: true});
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data: model
        })
    }
    create = async(req, res, next) => {
        console.log(req.body);
        let time=Math.floor(new Date().getTime() / 1000)-20000;
        this.checkValidation(req);
        const modell = await clientModel.create({
            "brandName": req.body.brandName,
            "fullname": req.body.fullname,
            "country": req.body.country,
            "region": req.body.region,
            "district": req.body.district,
            "teritory": req.body.teritory,
            "teritoryId": req.body.teritoryId,
            "districtId": req.body.districtId,
            "regionId": req.body.regionId,
            "countryId": req.body.countryId,
            "phone": req.body.phone,
            "loanSum": req.body.loanSum,
            "loanDollar": req.body.loanDollar,
            "image": req.body.image,
            "lat": req.body.lat,
            "lon": req.body.lon,
            "contact_person": req.body.contact_person,
            "showActions": req.body.showActions,
            "date_time": time
        });
        res.send({
            error: false,  
            error_code: 200,
            message: 'Добавил нового клиента',
            data: modell.dataValues
        });
    }

    update = async (req, res, next) =>{
            const model = await clientModel.scope('withoutPassword').findOne({
                where:{
                    id: req.params.id
                }
            })
        model.brandName = req.body.brandName,
        model.fullname = req.body.fullname,
        model.country = req.body.country,
        model.region =  req.body.region,
        model.district =  req.body.district,
        model.teritory = req.body.teritory,
        model.teritoryKey = req.body.teritoryKey,
        model.districtKey =  req.body.districtKey,
        model.regionKey = req.body.regionKey,
        model.countryKey = req.body.countryKey,
        model.phone =  req.body.phone,
        model.loanSum = req.body.loanSum,
        model.loanDollar = req.body.loanDollar,
        model.image = req.body.image,
        model.lat = req.body.lat,
        model.lon = req.body.lon,
        model.contact_person = req.body.contact_person,
       model.showActions = req.body.showActions
        model.save();
        res.status(200).send({
            error: false,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await clientModel.destroy({
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
module.exports = new clientController;