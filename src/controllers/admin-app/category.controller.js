const categoryModel = require('../../models/category.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const subcategoryModel = require('../../models/subcategory.model');
const moment = require('moment');
const { sequelize } = require('../../models/subcategory.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class categoryController {
    getOne = async (req, res, next) =>{
        const model = await categoryModel.findAll({
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
        const model = await categoryModel.findAll({raw: true});
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data:{"visit": model}
        })
    }
    categoriya = async(req, res, next) => {
        let currency = req.query.currencyid;
        const model = await categoryModel.findAll({
            include: [
                {model: subcategoryModel, as: 'subcategory',
            attributes:['id', 'name', 'image','top', 'currencyId']
            }
            ],
            where:{
                currencyId: req.query.currencyid
            }
        })
        let results = []
        model.forEach(val => {
                if(val.top == 0){
                    val.top = false
                } else{
                    val.top = true
                }
          let  result = {
            id : val.dataValues.id, 
            name: val.dataValues.name,
            productcount: val.dataValues.subcategory.length, 
            top: false, 
            image: ""}
            results.push(result)

        })
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Product list filial:02 Феендо махсулотлари",
            data: results
        })
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        const modell = await categoryModel.create({
            "name": req.body.name,
            "currencyId": req.body.currencyId,
            "productcount": req.body.productcount,
            "image": req.body.image,
            "top": req.body.top
        });
        res.send({
            error: false,  
            error_code: 0,
            message: 'Malumotlar qo\'shildi',
            data: modell.dataValues
        });
    }

    update = async (req, res, next) =>{
            const model = await categoryModel.scope('withoutPassword').findOne({
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
        const model = await categoryModel.destroy({
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
module.exports = new categoryController;