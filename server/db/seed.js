(async() => {
await require('..')

const { User, Journals, Moods, Habits } = require('.');
const loremIpsum = require('lorem-ipsum').LoremIpsum;

//setup lorem-ipsum
const lorem = new loremIpsum();

//clear database
User.destroyAll();
Journals.destroyAll();
Moods.destroyAll();
Habits.destroyAll();

user1 = await User.create({
    username: lorem.generateWords(1),
    location: lorem.generateWords(2),
})
await Journals.create({
    title: lorem.generateWords(5),
    body: lorem.generateParagraphs(3),
    UserId: user1.id,
})
await Journals.create({
    title: lorem.generateWords(5),
    body: lorem.generateParagraphs(3),
    UserId: user1.id,
})

user2 = await User.create({
    username: lorem.generateWords(1),
    location: lorem.generateWords(2),
})
await Journals.create({
    title: lorem.generateWords(5),
    body: lorem.generateParagraphs(3),
    UserId: user2.id,
})
await Journals.create({
    title: lorem.generateWords(5),
    body: lorem.generateParagraphs(3),
    UserId: user2.id,
})

})()