const LoadConfig = require('../../models/load_config.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class loadController {
    getOne = async (req, res, next) =>{
        const model = await LoadConfig.findOne({
            where:{
                id: req.params.id
            }
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
        const model = await LoadConfig.findAll(req.body);
        let models = {};
        model.forEach(value => {
             models = {...value.dataValues}
        })
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data: models
        })
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        var date_time = Math.floor(new Date().getTime() / 1000);
        const modell = await LoadConfig.create({
            "ipaddress": req.body.ipaddress,
            "secret_name": req.body.secret_name,
            "ipport": req.body.ipport,
            "href_address": req.body.href_address,
            "mobile_username": req.body.mobile_username,
            "bdate": date_time,
            "edate": date_time,
            "mobile_password": req.body.mobile_password,
            "agent_version_code": req.body.agent_version_code,
            "agent_app_url": req.body.agent_app_url,
            "host": req.body.host
        });
        res.status(200).send({
            error: false,  
            message: 'Malumotlar qo\'shildi',
            data: modell
        });
    }
    update = async (req, res, next) =>{
            const model = await LoadConfig.scope('withoutPassword').findOne({
                where:{
                    id: req.params.id
                }
            })
        var date_time = Math.floor(new Date().getTime() / 1000);
        model.secret_name = req.body.secret_name;
        model.ipaddress = req.body.ipaddress;
        model.ipport = req.body.ipport;
        model.href_address = req.body.href_address;
        model.mobile_username = req.body.mobile_username;
        model.bdate = date_time;
        model.edate = date_time;
        model.mobile_password = req.body.mobile_password;
        model.agent_version_code = req.body.agent_version_code;
        model.agent_app_url = req.body.agent_app_url;
        model.host = req.body.host;
        model.save();
        res.status(200).send({
            error: false,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await LoadConfig.destroy({
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
module.exports = new loadController;