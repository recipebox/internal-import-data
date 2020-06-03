// Read Google Sheet
// require('./api/google_sheet')

// Read Wongnai
const gauth = require('./api/google_auth');
const gsList = require('./api/gs_list');
const gsUpdate = require('./api/gs_update');
const wn = require('./api/get_wongnai');
const gcs = require('./api/gcs_upload');
const fsf = require('./api/firestore_function');
const data = require('./data/recipeData');
const model = require('./model/recipeModel');

async function main() {
    // **** Get google authentication
    //   let credential = await gauth.getCredential();
    //   let auth = await gauth.authorize(credential);
    // **** List from google sheet
    // gsList.listMajors(auth)
    // **** Download from Wongnai and upload to Google Sheet
    //let data = await wn.query("แพนง", 1)
    // data.unshift(HEADER)
    // gsUpdate.updateGSValue(auth, data)

    //   gcs.upload();

    // **** Example fetch recipes from collection
    // let data = await fsf.getData('recipes', 'YHgbEIcq4I904anamIR3')
    // console.log('data: ', data)
    // let data = await fsf.findData('recipes')

    // **** Example add list of data to recipes collection
    // let example = new data.ExampleData
    // let result = await fsf.addData('recipes', example.FirestoreCollection)
    // console.log('result:', result)

    let keywords = [
        'ปลาหมึก',
        'หมูย่าง',
        'หมู',
        'แซลมอล',
        'แกงเขียวหวาน',
        'แกงส้ม',
        'ต้มยำ',
        'แพนง',
        'พริกเผา',
        'กุ้ง',
        'ปลา',
        'ไก่',
        'ไข่',
        'ปลาหมึก',
        'หมู',
        'มาม่า',
        'ก๋วยเตี๋ยว',
        'กระเทียม',
        'หัวหอม',
        'ตุ๋น',
        'ผักชี',
        'ต้นหอม',
    ];

    let pages = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
    ];
    processArray(keywords, pages);
    /*
      keywords.forEach(async (keyword) => {
          // **** Download dat from WN and push to Firestore
          let wongnaiData = await getWongnaiData(keyword, 4)
          //console.log('wongnaiData: ', wongnaiData)

          let ingd = distinctIGD(wongnaiData)

          let recipeList = wongnaiData.map(element => JSON.parse(JSON.stringify(element)))
          console.log('length before addData:', recipeList.length)
          let result = await fsf.addData('recipes', recipeList)
          //console.log(result)


          let ingredientList = ingd.map(element => JSON.parse(JSON.stringify(element)))
          let result2 = await fsf.addData('ingredients', ingredientList)
          //console.log(result2)

      })*/
}

async function processArray(keywords, pages) {
    for (const keyword of keywords) {
        for (const page of pages) {
            try {

                await delayedLog(keyword, page);
            } catch (e) {
                console.log('error but dont care')
            }
        }
    }
    console.log('Done!');
}
async function delayedLog(keyword, item) {
    console.log('keyword:', keyword, ' - item: ', item);
    // **** Download dat from WN and push to Firestore
    let wongnaiData = await getWongnaiData(keyword, item);
    //console.log('wongnaiData: ', wongnaiData)

    let ingd = distinctIGD(wongnaiData);

    let recipeList = wongnaiData.map((element) =>
        JSON.parse(JSON.stringify(element))
    );
    console.log('length before addData:', recipeList.length);
    let result = await fsf.addData('recipes', recipeList);
    console.log(result)

    let ingredientList = ingd.map((element) =>
        JSON.parse(JSON.stringify(element))
    );
    let result2 = await fsf.addData('ingredients', ingredientList);
    //console.log(result2)
    await delay();
}

function delay() {
    return new Promise((resolve) => setTimeout(resolve, 5000));
}

async function getWongnaiData(keyword, page) {
    let data = await wn.query(keyword, page);
    let filterred = data.filter((item) => {
        return item.type === 'UGC';
    });
    console.log(
        'Done for keyword:',
        keyword,
        ' - page:',
        page,
        ' ==> Left total: ',
        filterred.length
    );

    let dataWithDetail = filterred.map(async (element) => {
        let recipeModel = new model.RecipeModel(element);
        //console.log('recipeModel.id: ', recipeModel.id, 'with type ', element.type)

        let detailObj = await wn.detail(element.id);
        recipeModel.ingredients = detailObj.ingredients;
        recipeModel.instructions = detailObj.instructions;
        recipeModel.photos = detailObj.photos.map((item) => item.smallUrl);
        return recipeModel;
    });
    console.log(
        'Done for keyword:',
        keyword,
        ' - page:',
        page,
        ' ==> Left total: ',
        dataWithDetail.length
    );
    return await Promise.all(dataWithDetail);
}

function distinctIGD(details) {
    let ingredients = new Map();

    details.forEach((element) => {
        // console.log('title: ', element.title)
        if (element.ingredients !== undefined) {
            element.ingredients.forEach((ingredient) => {
                //console.log('add ingredient: ', ingredient.ingredientName)
                ingredients.set(ingredient.ingredientName, '');
            });
        }
    });

    let ingredientArr = Array.from(ingredients.keys());
    return ingredientArr.map((element) => new model.IngredientModel(element));
}

main();