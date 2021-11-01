const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true, });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '617d52fcf3d58d598c6fe632',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo nisi fugiat perspiciatis fuga deserunt optio dignissimos consequatur aliquid quia, laborum excepturi ipsam nam, consectetur debitis illo? Ratione labore obcaecati culpa.',
            price,
            geometry: { 
              type : "Point", 
              coordinates: [ 
                cities[random1000].longitude, 
                cities[random1000].latitude
              ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/djzmhyqre/image/upload/v1635687295/YelpCamp/vrcuugdbet6vovf5bega.jpg',
                  filename: 'vrcuugdbet6vovf5bega'
                },
                {
                  url: 'https://res.cloudinary.com/djzmhyqre/image/upload/v1635682626/YelpCamp/yhwturwblzdivqbgxndy.jpg',
                  filename: 'YelpCamp/yhwturwblzdivqbgxndy'
                }
              ]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})