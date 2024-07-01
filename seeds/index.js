const mongoose = require('mongoose');
const cities = require('./cities'); //one dot because it is in the same folder
const {places, descriptors} = require('./seedHelpers');
        // need to back 1 folder thats why double dot
const Campground = require('../models/campground'); // import from campground.js

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open", () =>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=> {
    // await Campground.deleteMany({});
    for (let i = 0; i < 5; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50)+ 20;
        const camp = new Campground({
            //YOUR USER ID
            author: '6667640f38a1135c2216e6d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://picsum.photos/800/500',// to get random image
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem veniam magnam voluptatem quidem voluptates quis beatae repellendus error, modi nesciunt nobis quasi similique earum. Accusamus tempore error provident mollitia fuga!',
            price: `${price}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                    {
                      url: 'https://res.cloudinary.com/dfeirmutk/image/upload/v1718221104/YelpCamp/ewappaahprcur8ufxmsu.jpg',
                      filename: 'YelpCamp/ewappaahprcur8ufxmsu'
                      
                    },
                    {
                      url: 'https://res.cloudinary.com/dfeirmutk/image/upload/v1718221107/YelpCamp/ixal6awakus79xk77o3k.jpg',
                      filename: 'YelpCamp/ixal6awakus79xk77o3k'
                      
                    }   
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

