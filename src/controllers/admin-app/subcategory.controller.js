const subcategoryModel = require('../../models/subcategory.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fullproductModel = require('../../models/fullproduct.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class subcategoryController {
    getOne = async (req, res, next) =>{
        const model = await subcategoryModel.findAll({
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
        const model = await subcategoryModel.findAll({raw: true});
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data:{"visit": model}
        })
    }
    subcategory = async(req, res, next) =>{
        const model = await subcategoryModel.findAll({
            where:{
                categoryId: req.params.categoryid,
                currencyId: req.query.currencyid
            },
            include:[
                {model: fullproductModel, as:'product'}
            ],
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
            productcount: val.dataValues.product.length, 
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
    product = async(req, res, next) => {
        const model = await fullproductModel.findAll({
            attributes: ['id', 'name', 'unit', 'ostatok', 'ostatokBlok', 'sht','massa', 'bonus', 
            'bonusNorma', 'bonusKolvo', 'price', 'image', 'incomePrice'
            ],
            where:{
                categoryId: req.params.categoryid,
                subCategoryId: req.params.subcategoryid,
                currencyId: req.query.currencyid,
                storeId: req.query.storeid
            }
        })
        model.forEach(val => {
            if(val.bonus == 0){
                val.bonus = false
            } else{
                val.bonus = true
            }
        })
        res.send({
            "error": false,
            "error_code": 200,
            "message": "Product list filial:02 Феендо махсулотлари",
            data: model
        })
    }
    create = async(req, res, next) => {
        console.log(req.body);
        this.checkValidation(req);
        const modell = await subcategoryModel.create({
            "name": req.body.name,
            "categoryId": req.body.categoryId,
            "productcount": req.body.productcount,
            "image": req.body.image,
            "top": req.body.top,
            "currencyId": req.body.currencyId,
        });
        res.send({
            error: false,  
            error_code: 0,
            message: 'Malumotlar qo\'shildi',
            data: modell.dataValues
        });
    }

    update = async (req, res, next) =>{
            const model = await subcategoryModel.scope('withoutPassword').findOne({
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
        const model = await subcategoryModel.destroy({
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
module.exports = new subcategoryController;