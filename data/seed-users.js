const DB = require('../db.js')

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
    await DB.init()

    const fakeUsers = []
    for (var i = 0; i <= 100; i++) {
        const r = rand(1, 999)
        fakeUsers.push({
            googleId: `googleid_${r}`,
            email: `email_${r}@gmail.com`,
            givenName: `givenName_${r}`,
            familyName: `familyName_${r}`,
            imageUrl: `http://placekitten.com/g/${r}/${r}`,
            jwtToken: `jwtToken_${r}`,
            points: r
        })
    }
    
    DB.createMany('Users', fakeUsers)
    console.log('users seeded')
}

seed()
