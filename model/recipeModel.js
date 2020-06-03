class RecipeModel {
    id
    title
    description
    created_at
    updated_at
    cookingDuration
    prepareDuration
    photos
    ingredientIDs
    ingredients
    owner
    categories
    instructions

    constructor(wnDetai) {
        this.id = wnDetai.id
        this.title = wnDetai.title
        this.description = wnDetai.description
        this.created_at = Date.now()
        this.updated_at = Date.now()
        this.cookingDuration = (wnDetai.cookTimeH * 60) + wnDetai.cookTimeM
        this.prepareDuration = (wnDetai.prepTimeH * 60) + wnDetai.prepTimeM
        this.photos = [wnDetai.photo.smallUrl]
        this.ingredientIDs = this.splitIngredient(wnDetai.ingredientKeywords)
        this.owner = "SYSTEM"
    }

    splitIngredient(ingredients) {
        let ingredientArr = ingredients.split(',');
        let returnList = []
        ingredientArr.forEach(element => {
            let inx = element.trim().split(' ')
            returnList.push(inx[0].trim())
        });
        return returnList
    }
}

String.prototype.trim = function (charlist) {
    return this.trimLeft(charlist).trimRight(charlist);
};

class IngredientModel {
    id
    title
    description
    photos
    constructor(name) {
        this.id = name
        this.title = name
    }
}

module.exports = {
    RecipeModel,
    IngredientModel
}