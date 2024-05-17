const equipmentSeeds = require('./equipmentSeeds.json');

const equipmentRandomizer = () => { 

    const randomEquipmentArr = [];

    for (var equipment of equipmentSeeds) {
       if (Math.floor(Math.random() * 2)) {
        randomEquipmentArr.push(equipment);
       }
    }
    
    return randomEquipmentArr;
};

module.exports = equipmentRandomizer;