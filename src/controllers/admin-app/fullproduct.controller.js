const fullproductModel = require('../../models/fullproduct.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Op, Sequelize } = require('sequelize');
const { sequelize } = require('../../models/fullproduct.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class fullproductController {
    getOne = async (req, res, next) =>{
        let query = {};
        query.id = {
            [Op.gte]: req.params.id
        }
        const model = await fullproductModel.findAll({
            where: query,
            limit: 100
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
        const model = await fullproductModel.findAll({raw: true});
        res.send({
            error: false,
            error_code: 0,
            message: "malumotlar chiqdi",
            data:{"visit": model}
        })
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        const modell = await fullproductModel.create({
            "name": req.body.name,
            "ostatok": req.body.ostatok,
            "ostatokBlok": req.body.ostatokBlok,
            "sht": req.body.sht,
            "massa": req.body.massa,
            "bonus": req.body.bonus,
            "bonusNorma": req.body.bonusNorma,
            "bonusKolvo": req.body.bonusKolvo,
            "price": req.body.price,
            "image": req.body.image,
            "incomePrice": req.body.incomePrice,
            "unit": req.body.unit,
            "currencyId": req.body.currencyId,
            "storeId": req.body.storeId,
            "categoryId": req.body.categoryId,
            "subCategoryId": req.body.subCategoryId,
            "top": req.body.top
        });
        res.send({
            error: false,  
            error_code: 0,
            message: 'Malumotlar qo\'shildi',
            data: modell.dataValues
        });
    }
      
    search = async (req, res, next) => {
        let ModelList = await fullproductModel.findAll({
            attributes: ['id', 'name', 'unit', 'ostatok', 'ostatokBlok', 'sht','massa', 'bonus', 
        'bonusNorma', 'bonusKolvo', 'price', 'image', 'incomePrice'
        ],
            where:{ 
                name:{  [Op.like]: '%'+req.query.name+'%'},
                storeId: req.query.storyId,
                currencyId: req.query.currencyId
            },
            order: [
                ['name', 'ASC'],
                ['id', 'ASC']
            ],
            limit:100,
            raw: true
        });
        ModelList.forEach(val => {
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
            data: ModelList
        });
    };
    fullproduct = async (req, res, next) => {
        let id = JSON.parse(req.query.id)
        let currencyId = JSON.parse(req.query.currencyid)
        let storyId = JSON.parse(req.query.storeid)
        const model = await fullproductModel.findAll({
            attributes: ['id', 'name', 'unit', 'ostatok', 'ostatokBlok', 'sht','massa', 'bonus', 
            'bonusNorma', 'bonusKolvo', 'price', 'image', 'incomePrice'
            ],
            where:{
                id: {[Op.gt]: id},
                currencyId: currencyId,
                storeId: storyId
            },
            raw: true
        })
        if(!model){
            res.send({
                error: true,
                error_code: 0,
                message: "bunday id da malumot yo'q"
            })
        }
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
            "message": "Filtered Product list for filial: 02 Феендо махсулотлари",
            data: model
        })
    }
    
    checkProduct = async(req, res, next) => {
       const {items, ...data}  = req.body;
       let result = [];
       for(let i =0; i < items.length; i++){
        console.log(items[i]);
        const model = await fullproductModel.findAll({
            attributes: ['id', 'name', 'unit', 'ostatok', 'ostatokBlok', 'sht','massa', 'bonus', 
            'bonusNorma', 'bonusKolvo', 'price', 'image', 'incomePrice'
            ],
            where:{
                id: items[i].id,
                currencyId: data.currencyid,
                storeId: data.storeid
            }
        })
        model.forEach(val => {
            result.push(val)
        }) 
       }
       result.forEach(val => {
         if(val.bonus == 0){
            val.bonus = false
         }
         else{
            val.bonus = true
         }
       })
       res.send({
        error: false,
        error_code: 200,
        message: "checkProduct",
        data: result
    })
}

    products = async(req, res, next) => {
        console.log(req.params);
        const model = await fullproductModel.findAll({
            attributes: ['id', 'name', 'unit', 'ostatok', 'ostatokBlok', 'sht','massa', 'bonus', 
            'bonusNorma', 'bonusKolvo', 'price', 'image', 'incomePrice'
            ],
            where:{
                categoryId: req.params.categoryid,
                subCategoryId: req.params.subcategoryid,
                currencyId: req.query.currencyid,
                storeId: req.query.storeid,

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
    delete = async (req, res, next) =>{
        const model = await fullproductModel.destroy({
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
module.exports = new fullproductController;