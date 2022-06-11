const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Type } = require("../db");
const axios = require("axios");
const {normalizeDb,normalizeApi,normalizeApiList,normalizeTypes,normalizeDbCreated} = require('./utils.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/'), async(req,res)=>{
    return req;

}

router.get('/recipes', async(req,res)=>{
    const {query} = req.query;
    try{
        //BUSCAMOS DENTRO DE NUESTRA BASE DE DATOS.
        if (query){
            const lower_name = query.trim();
            
            const recipe_db_name = await Recipe.findOne({
                WHERE: {title:lower_name},
                include: Type,
            });
            console.log("NAME",recipe_db_name)
            if (recipe_db_name === null){
                return res.json(normalizeDb(recipe_db_name))
            }
            
        else{
            const lower_name = query.trim();
            
                //EN CASO DE NO ENCONTRARLA BUSCAMOS EN LA API
            const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${lower_name}&apiKey=a196c1be059c455593f593aa688e5293`);
            
            
            return res.json(normalizeApiList(apiResponse).results)
            }

        }
        else{    //EN CASO DE NO EXISTIR EL QUERY PARAM 
            //Llamamos a la Api
            const apiCallResp = await axios.get("https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=a196c1be059c455593f593aa688e5293");
            
            var array = normalizeApiList(apiCallResp).results;
            //Llamamos a la DB
            const dataDB = await Recipe.findAll({
                 include: {
                   model: Type,
                   attributes: ["name"],
                   through: { attributes: [] },
                },
           
               });
            const NormDBArray = normalizeDb(dataDB)
            
            if(NormDBArray){
            //   //Concatenamos las recipes de DB y API
            
            const totalrecipes = [...array, ...NormDBArray]

            
            return res.status(200).json(totalrecipes);
            }
            else{
                return res.status(200).json(array)
            }
            
        
          
        }
    }
    catch(error){
        res.status(404).json({ msg: "Recipe not found. " + error });
    }
})


router.get('/recipes/:idReceta',async(req, res)=>{  
    const {idReceta} = req.params;
    
    try{
        const recipe_by_id = await Recipe.findByPk(idReceta, { include: Type });
            
        
        if (recipe_by_id === null){
            res.status(400).json("ERROR Recipe id not found ")
        }
        
        return res.json(normalizeDbCreated(recipe_by_id))

    }
    catch{
        try{
            const apiCall = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?&apiKey=a196c1be059c455593f593aa688e5293`)
            
            return res.json(normalizeApi(apiCall))
        }   
        catch(error){
            res.status(400).json("Recipe Id not found " + error)
        }
    }
})  


router.get('/types',async(req,res)=>{
    try{

        const apiCallResp = await axios.get("https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=a196c1be059c455593f593aa688e5293");
            
        var arrayApi = normalizeApiList(apiCallResp).results;
        var allApidiets = []
        arrayApi.map((t)=>{
            
            if(t.diets){
                t.diets.map((d)=>{
                    allApidiets.push(d);
                })
            }
        })
        
        
        var array =["gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian","vegan","paleo","primal","low FODMAP","whole 30"]
        concated = array.concat(allApidiets)

        var arrayDbAndApi= [...new Set(concated)]
        var allTypes=[]
            
        for(var i=0;i<arrayDbAndApi.length;i++){
            allTypes.push(await Type.findOrCreate({
                where: {name: arrayDbAndApi[i]},
                    
            }));
        }
            
            
        res.status(200).json(normalizeTypes(allTypes).results)
        
    }
      catch(error){
         res.status(400).json("Error to create types: " + error)
      }
})


router.post('/recipe',async(req,res)=>{
    try{
        
        let {title, summary, spoonacularScore, healthScore, steps , diets ,image,dishTypes} = req.body;

        if (!title || !summary)return res.status(400).send('Error, missing necessary parameters');
    
        const lower_name = title.trim();  

        var dietsArray= [...new Set(diets)]
        var dishArray = [...new Set(dishTypes)]

        const createdRecipe = await Recipe.create({
            title: lower_name,
            summary,
            spoonacularScore,
            healthScore,
            steps,
            image,
            diets:dietsArray,
            dishTypes:dishArray,
        })
        
        const typeDbArr = await Type.findAll({
            where: { name: dietsArray },
        });
        
        const typeDbId = typeDbArr?.map((p) => p.dataValues.id);

        await createdRecipe.addType(typeDbId);

        
        const newRecipe = await Recipe.findOne({
            where: { title: lower_name },
            include: Type,
        });
        
        return res.json(normalizeDbCreated(newRecipe));

    }
    catch(error){
         return res.status(404).json("Error, " + error);
    }
})





module.exports = router;
