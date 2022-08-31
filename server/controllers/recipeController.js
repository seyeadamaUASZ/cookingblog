require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
/**
 * GET /
 * Homepage
 */
exports.homepage = async(req,res)=>{
  
   try{
     const limitNumber = 5;
     const categories = await Category.find({}).limit(limitNumber);
     //recipe
     const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
     //console.log(latest)
     const thai = await Recipe.find({'category':'Thai'}).limit(limitNumber)
     const american = await Recipe.find({'category':'American'}).limit(limitNumber)
     const chinese = await Recipe.find({'category':'Chinese'}).limit(limitNumber)
     const food =  {latest,thai,american,chinese};

     res.render('index',{title:'cooking !!!',categories,food}) 
   }catch(error){
      res.status(500).send({message:error.message || 'Error occured'})
   }   
}

//GET category
exports.exploreCategories = async(req,res)=>{
  
   try{
     const limitNumber = 20;
     const categories = await Category.find({}).limit(limitNumber);
     //console.log(categories)
     res.render('categories',{title:'cooking !!!',categories}) 
   }catch(error){
      res.status(500).send({message:error.message || 'Error occured'})
   }   
}


exports.exploreRecipe = async(req,res)=>{
      try{
         let recipeId = req.params.id;

         const recipe = await Recipe.findById(recipeId);

         //const categories = await Category.find({}).limit(limitNumber);
         //console.log(categories)
         res.render('recipe',{title:'cooking !!!',recipe}) 
       }catch(error){
          res.status(500).send({message:error.message || 'Error occured'})
       } 

   }



  /**
   * search
   */

exports.searchRecipe = async(req,res)=>{
  try{
   let searchTerm = req.body.searchTerm;
   let recipe = await Recipe.find({$text:{$search: searchTerm, $diacriticSensitive:true}});
   res.render('search',{title:'cooking blog search',recipe})
   //res.json(recipe);
  }catch(error){
    res.status(500).send({message:error.message || 'Error occured'})
  }

 
}



exports.exploreLatest=async(req,res)=>{
  try{
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);

    res.render('explore-latest',{title:'cooking recipe',recipe})

  }catch(error){
    res.status(500).send({message:error.message || 'Error occured'})
  }
}


exports.exploreRandom = async(req,res)=>{
  try{
     let count = await Recipe.find().countDocuments();
     let random = Math.floor(Math.random()*count);
     let recipe = await Recipe.findOne().skip(random).exec();

     res.render('explore-random',{title:'cooking ',recipe})
  }catch(error){
    res.status(500).send({message:error.message || 'Error occured'})
  }
 
}

//submit recipe
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}


exports.submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}






 

//By Id
   exports.exploreCategoriesById = async(req,res)=>{
      try{
        let categorieById = req.params.id
        //console.log(categorieById)
        const limitNumber = 20;
        const categoryById = await Recipe.find({category:categorieById}).limit(limitNumber);
        //console.log(categories)
        res.render('categories',{title:'cooking !!!',categoryById}) 
      }catch(error){
         res.status(500).send({message:error.message || 'Error occured'})
      }   
   }




// async function insertDymmyCategoryData(){
//    try{
//     await Category.insertMany([
//             {
//               "name": "Thai",
//                "image": "thai-food.jpg"
//              },
//              {
//                "name": "American",
//                "image": "american-food.jpg"
//              }, 
//              {
//                "name": "Chinese",
//                "image": "chinese-food.jpg"
//              },
//              {
//                "name": "Mexican",
//                "image": "mexican-food.jpg"
//              }, 
//              {
//                "name": "Indian",
//               "image": "indian-food.jpg"
//             },
//             {
//               "name": "Spanish",
//                "image": "spanish-food.jpg"
//              }
//            ]);
//    }catch(error){
//      console.log('eroor '+error)
//    }
// }

// insertDymmyCategoryData();


/*async function insertDymmyRecipeData(){
      try {
        await Recipe.insertMany([
          { 
            "name": "Recipe Name Goes Here",
            "description": `Recipe Description Goes Here`,
            "email": "recipeemail@raddy.co.uk",
            "ingredients": [
              "1 level teaspoon baking powder",
              "1 level teaspoon cayenne pepper",
              "1 level teaspoon hot smoked paprika",
            ],
            "category": "American", 
            "image": "southern-friend-chicken.jpg"
          },
          { 
            "name": "Recipe Name Goes Here",
            "description": `Recipe Description Goes Here`,
            "email": "recipeemail@raddy.co.uk",
            "ingredients": [
              "1 level teaspoon baking powder",
              "1 level teaspoon cayenne pepper",
              "1 level teaspoon hot smoked paprika",
            ],
            "category": "American", 
            "image": "southern-friend-chicken.jpg"
          },
        ]);
      } catch (error) {
        console.log('err', + error)
      }
    }
   
    insertDymmyRecipeData();*/