const Genre = require('./models/genreModel');

const defaultGenres = [
    { name: 'Fantasy' },
    { name: 'Science Fiction' },
    { name: 'Mystery' },
    { name: 'Thriller' }
];

async function seedGenres() {
    try {
        const count = await Genre.countDocuments();
        if (count === 0) {
            await Genre.insertMany(defaultGenres);
            console.log('Default genres seeded');
        }
    } catch (err) {
        console.error('Error seeding genres:', err);
    }
}


module.exports = seedGenres;
