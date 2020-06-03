class ExampleData {
    FirestoreCollection = [{
        "id": "12345",
        "title": "ต้มข่าไก่",
        "description": "abc_1234",
        "ingredients": ["ไก่", "ไข่", "พริกแกง", "หัวหอม"]
        // }, {
        //     "id": "12366",
        //     "title": "พริกแกงหมู",
        //     "description": "abc_166",
        //     "ingredients": ["หมู", "พริกแกง", "กระเทียม"]
        // }, {
        //     "id": "1111",
        //     "title": "tile_1111",
        //     "description": "abc_111"
    }, ];

    GS_HEADER = [
        'Title',
        'Description',
        'Cooking Time (Hour)',
        'Cooking Time (Minute)',
        'Prepare Time (Hour)',
        'Prepare Time (Minute)',
        'Total like',
        'Photo',
        'Ingredients',
    ];
}


module.exports = {
    ExampleData
}