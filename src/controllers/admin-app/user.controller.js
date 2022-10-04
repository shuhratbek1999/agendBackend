const UserModel = require('../../models/user.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('../../startup/config');
const load = require('../../models/load_config.model')

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const {  password, login } = req.body;
        const model = await UserModel.findOne({
            where:{
                name: login
            }
        });
        if(!model){
            throw new HttpException(404, 'login yoki parol xato')
        }
        const isMatch = await bcrypt.compare(password, model.password)
        delete model['password'];
        if(!isMatch){
            throw new HttpException(404, "Parol noto'g'ri kiritildi")
        }

        const token = jwt.sign({ user_id: model.id.toString() }, secret_jwt, {
            expiresIn: '24h'
        });
        if(!token){
           throw new HttpException(404, "token mavjud emas")
        }
        model.token = token
        res.status(200).send({
            error: false,
            error_code: 0,
            message: 'Ro\'yhatdan o\'tdingiz',
            data: model
        });
    };
     
    getUser = async (req, res, next) =>{
        const model = await UserModel.findAll(req.body);
        var models = {};
        model.forEach(value => {
            models = {...value.dataValues}
        })
        // models.token = token;
        // console.log(token);
        // console.log(model.dataValues);
        res.send({
            error: false,
            error_code: 0,
            message: "hatolik mavjud emas",
            data: models
        })
    }
    getOne = async (req, res, next) =>{
        const model = await UserModel.scope('withoutPassword').findOne({
            where:{
                id: req.params.id
            }
        })
        if(!model){
            throw new HttpException(404, "bu id da malumot yo\'q")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
        let date_day = new Date().getDate()
        const modell = await UserModel.create({
            "name": req.body.name,
            "password": req.body.password,
            "typeName": req.body.typeName,
            "countryId": req.body.currencyId,
            "countryName": req.body.countryName,
            "region_id": req.body.region_id,
            "currencyId": req.body.currencyId,
            "storeId": req.body.storeId,
            "regionName": req.body.regionName,
            "storeName": req.body.storeName,
            "currency": req.body.currency,
            "kurs": req.body.kurs,
            "allowEdit": req.body.allowEdit,
            "sendLocation": req.body.sendLocation,
            "day": date_day
        });
        modell.day = new Date().getMonth
        delete req.body['password']
        res.status(200).send({
            error: false,  
            error_code: 0,
            message: 'Malumotlar qo\'shildi',
            data: modell
        });
    }
    update = async (req, res, next) =>{
        const salt = await bcrypt.genSalt();
        let data = req.body;
            const pasXash = await bcrypt.hash(data.password.toString(), salt);
            delete data['password'];
            data['password_hash'] = pasXash;
            const model = await UserModel.scope('withoutPassword').findOne({
                where:{
                    id: req.params.id
                }
            })
        model.user_name = req.body.user_name;
        model.role = req.body.role;
        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await UserModel.destroy({
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
module.exports = new UserController;