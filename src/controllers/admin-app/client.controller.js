const clientModel = require('../../models/client.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const RegionModel = require('../../models/region.model');
const districtModel = require('../../models/district.model');
const villageModel = require('../../models/village.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class clientController {
    getOne = async (req, res, next) =>{
        let time = new Date().getDay();
        console.log(time);
        const model = await clientModel.findAll({
            raw: true
        })
        if(!model){
            throw new HttpException(404, "bu id da malumot yo\'q")
        }
        let result = [{"visit": model}]
        res.status(200).send({
            "error": false,
            "error_code": 200,
            "message": "Full Client List",
            data: result
        });
    }
    getAll = async (req, res, next) => {
        let time = new Date().getDay();
        const model = await clientModel.findAll({
            attributes: ['fullName', 'date_time', 'brandName', 'region', 'country', 'phone', 'loanSum', 'image', 'lat', 'lon', 'contact_person',
        ],
        where:{
           date_time: time
        },
        include:[
            {model: RegionModel, as:'items', attributes: ['name']},
            {model: districtModel, as:'districts', attributes: ['name']},
        ] 
        });
        let result = []
        model.forEach(val => {
            for(let i = 0; i<val.items.length; i++){
                val.region = val.items[i].dataValues.name;
                val.district = val.districts.name;
                const {items, districts, ...data} = val.dataValues;
                result.push(data)
            }
        })
        
        res.send({
            error: false,
            error_code: 0,
            message: "Visit juma",
            data: result
        })
    }
    create = async(req, res, next) => {
        let time= new Date().getDay() + 2;
        this.checkValidation(req);
        const modell = await clientModel.create({
            "brandName": req.body.firstname,
            "fullname": req.body.fullname,
            "teritoryId": req.body.teritoryKey,
            "districtId": req.body.districtKey,
            "regionId": req.body.regionKey,
            "countryId": req.body.countryKey,
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