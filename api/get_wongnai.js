const axios = require('axios');

const WONGNAI_BASE_URL = 'https://www.wongnai.com/_api/v1.6/cooking/recipes'
const WONGNAI_PAGE_SIZE = 10;

async function query(keyword, pageNumber) {

  let url = `${WONGNAI_BASE_URL}?_v=5.127&locale=th&page.size=${WONGNAI_PAGE_SIZE}&page.number=${pageNumber}&q=${encodeURI(
    keyword
  )}`;
  console.log('url: ', url);
  try {
    let response = await axios({
      method: "get",
      url: url,
      headers: {
        'User-Agent': null
      }
    });
    let entities = response.data.data.page.entities;

    return entities;
  } catch (e) {
    console.log('err:', e);
  }
}

async function detail(recordID) {
  const baseURL = 'https://www.wongnai.com/_api/v1.6/cooking/recipes';

  let url = `${baseURL}/${recordID}?_v=5.127&locale=th&purpose=_v`
  console.log('---url: ', url);
  try {
    let response = await axios({
      method: "get",
      url: url,
      headers: {
        'User-Agent': null
      }
    });
    let data = response.data.data;
    //console.log('xxxxx:data:', data)
    //console.log('++++++++++++++++++++++++++++++++++++++++++++')
    data.ingredients = data.ingredients.map((igd) => {
      let name = igd.ingredientName.trim().split(' ')[0].trim()
      igd.ingredientName = name
      return igd

    })
    // console.log('data inside: ', data)
    return data;
  } catch (e) {
    console.log('err:', e);
  }
}

// Later might use for insert to google sheet
// function parseEntity(entity) {
//   let data = [];
//   data.push(entity.title);
//   data.push(entity.description);
//   data.push(entity.cookTimeH);
//   data.push(entity.cookTimeM);
//   data.push(entity.prepTimeH);
//   data.push(entity.prepTimeM);
//   data.push(entity.allTimeScore);
//   data.push(entity.totalLike);
//   data.push(entity.thumbnailPhoto);
//   data.push(entity.ingredientKeywords);
//   return data;
// }

module.exports = {
  query,
  detail
};