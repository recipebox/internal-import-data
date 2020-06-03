const firestore = require('./firestore').firestore;

async function getData(collection, docID) {

    let recipes = firestore.collection(collection)
    let recipe = recipes.doc(docID)
    let doc = await recipe.get()
    return doc.data();
}


async function findData(collection) {

    let recipes = firestore.collection(collection).where('rating', '==', 5)
    // let recipe = recipes.doc(docID)
    let snapshot = await recipes.get()
    console.log('snapshot:', snapshot)
    snapshot.forEach(doc => {
        console.log('doc:', doc.data())
    })
    //return doc.data();
}

async function addData(collection, list) {

    let batch = firestore.batch();
    console.log('collectionName:', collection, ' - ', list.length)
    list.forEach(item => {
        //console.log('item: ', item)
        let temp = firestore.collection(collection).doc(item.id);
        batch.set(temp, item);
    })
    console.log('before commit:')
    let result = await batch.commit()
    console.log('after commit:')
    console.log('result', result);
    return result
}

module.exports = {
    getData,
    findData,
    addData
}