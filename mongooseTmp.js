'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox', {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => {
    console.error(`connection error:`, error);
});

db.once('open', () => {
    console.log('db connection successful');
    //All db communication goes here
    let Schema = mongoose.Schema;
    let AnimalSchema = new Schema({
        type: { type: String, default: 'goldfish' },
        color: { type: String, default: 'gold' },
        size: String,
        mass: { type: Number, default: 50 },
        name: { type: String, default: 'fishy' }
    });

    //prehook:
    AnimalSchema.pre('save', function (next) {
        //executes before mongoose 'saves' the data
        if (this.mass >= 100) {
            this.size = 'big';
        } else if (this.mass >= 5 && this.mass < 100) {
            this.size = 'medium';
        } else {
            this.size = 'small';
        }

        next();
    });

    AnimalSchema.statics.findSize = function (size, callback) {
        //this == Animal
        return this.find({ size: size }, callback);
    };

    AnimalSchema.methods.findSameColor = function (callback) {
        //this == document
        return this.model("Animal").find({ color: this.color }, callback);
    };

    const Animal = mongoose.model('Animal', AnimalSchema);

    const elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        mass: 6000,
        name: 'Lawrence'
    });

    const generic = new Animal({});
    const whale = new Animal({
        type: 'whale',
        color: 'orange',
        mass: 25000,
        name: 'moses'
    });

    const animalData = [
        {
            type: 'mouse',
            color: 'gray',
            mass: 20,
            name: 'Mickey'
        },
        {
            type: 'nutria',
            color: 'brown',
            mass: 3.14,
            name: 'pie'
        },
        {
            type: 'wolf',
            color: 'gray',
            mass: 45,
            name: 'iris'
        },
        elephant,
        generic,
        whale
    ];
    //save after removing existing data
    Animal.remove({}, err => {
        if (err) {
            console.error('save failed');
        }
        Animal.create(animalData, (err, animals) => {
            if (err) {
                console.error(error);
            }

            Animal.findOne('elephant', (err, animals) => {
                elephant.findSameColor((err, animals) => {
                    animals.forEach(animal => {
                        console.log(
                            `${animal.name} the ${animal.color} ${animal.size} ${animal.type}`
                        );
                    });
                    db.close(() => {
                        console.log('connection closed.');
                    });
                });
            });
        });

        console.log('saved animals successfully');
    });
});

//use callback so it is done async. Not closing before it has time to save
