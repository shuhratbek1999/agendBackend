const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const RegionModel = require('../../models/region.model');
const DistrictModel = require('../../models/district.model');
const clientAdressModel = require('../../models/clientAdress.model');
const villageModel = require('../../models/village.model');
const clientModel = require('../../models/client.model')
const { Op } = require("sequelize");
const { sequelize } = require('../../models/region.model');
const moment = require('moment');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class clientController {
    getOne = async (req, res, next) =>{
        const model = await clientAdressModel.findOne({
            where:{
                id: req.params.id
            },
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
    getUser = async(req, res, next) => {
        const x = await RegionModel.findAll({
            include:[
                {model: DistrictModel, as: "items", attributes: ['id','name', 'clientcount'],
             include:[
                {model: villageModel, as: "items", attributes: ['id', 'name', 'clientcount']}
             ]
            }
            ],
        });

        const model = await clientAdressModel.findAll();
        model[0].dataValues.items = [];
        x.forEach(value => {
            model[0].dataValues.items.push(value)
        })
        res.send({
            error: false,
            error_code: 0,
            message: "Hatolik mavjud emas",
            data: model
        })
    }
    getFull = async(req, res, next) => {
        let time=Math.floor(new Date().getTime() / 1000)-20000;
        let time2 = Math.floor(new Date().getTime() / 1000)+60000;
        let query = {};
        query.date_time =  {
            [Op.lte]: time,
        };
         let x = await RegionModel.findAll({
            attributes:[
                [sequelize.fn('SUM', sequelize.col('clientcount')), 'clientcount']
            ]
         })
         const model = await clientModel.findAll({
            attributes: ['id', ['country', 'name']],
            include:[
                {model: RegionModel, as: 'items', attributes:['id', 'name', 'clientcount'
            ],
                
             include:[
                {model: DistrictModel, as: "items",attributes:['id', 'name', 'clientcount',
            ]} 
             ]
            }
            ],
            where: query,
            limit: 1
         })
         model[0].dataValues.clientcount = x[0].dataValues.clientcount;
         res.send({
            error: false,
            error_code: 0,
            message: 'Client Adress',
            data: model
         })
    }
    create = async(req, res, next) => {
       
        let r = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
        this.checkValidation(req);
        const modell = await clientAdressModel.create({
            "name": req.body.name,
            "clientcount": req.body.clientcount,
            "key": r
        })
        res.send({
            error: false,  
            error_code: 0,
            message: 'Malumotlar qo\'shildi',
            data: modell.dataValues
        });
    }


    update = async (req, res, next) =>{
            const model = await clientAdressModel.scope('withoutPassword').findOne({
                where:{
                    id: req.params.id
                }
            })
        model.name = req.body.name;
        model.clientcount = req.body.clientcount;
        model.key = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
        model.save();
        res.status(200).send({
            error: false,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    delete = async (req, res, next) =>{
        const model = await clientAdressModel.destroy({
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