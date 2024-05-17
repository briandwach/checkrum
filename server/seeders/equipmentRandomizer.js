const equipmentSeeds = require('./equipmentSeeds.json');

const equipmentRandomizer = () => {
    
    const equipmentRanTotal = (Math.floor(Math.random() * equipmentSeeds.length) + 1);
    
    console.log(equipmentRanTotal);

    const result = [];
    const indexes = new Set();

    while (indexes.size < equipmentRanTotal) {
        const randomIndex = Math.floor(Math.random() * equipmentSeeds.length);
        indexes.add(randomIndex);
    }

    indexes.forEach(index => {
        result.push(equipmentSeeds[index]);
    });

    console.log(result);
    return result;
};

module.exports = equipmentRandomizer;