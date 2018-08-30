const DB = require('./db.js')

const fakeUsers = [
    { googleId: 'googleid_1', email: 'mickeymouse@gmail.com', givenName: 'Mickey', familyName: 'Mouse', imageUrl: 'https://picsum.photos/50/50/?image=901', jwtToken: 'jwtToken_1', points: '3501', role: 'user' },
    { googleId: 'googleid_2', email: 'minniemouse@gmail.com', givenName: 'Minnie', familyName: 'Mouse', imageUrl: 'https://picsum.photos/50/50/?image=902', jwtToken: 'jwtToken_2', points: '3422', role: 'user' },
    { googleId: 'googleid_3', email: 'donaldduck@gmail.com', givenName: 'Donald', familyName: 'Duck', imageUrl: 'https://picsum.photos/50/50/?image=902', jwtToken: 'jwtToken_3', points: '203', role: 'user' },
    { googleId: 'googleid_4', email: 'pluto@gmail.com', givenName: 'Pluto', familyName: 'Pluto', imageUrl: 'https://picsum.photos/50/50/?image=903', jwtToken: 'jwtToken_4', points: '14', role: 'user' },
    { googleId: 'googleid_5', email: 'mortysmith@gmail.com', givenName: 'Morty', familyName: 'Smith', imageUrl: 'https://picsum.photos/50/50/?image=904', jwtToken: 'jwtToken_5', points: '4582133', role: 'user' },
    { googleId: 'googleid_6', email: 'ricksanchez@gmail.com', givenName: 'Rick', familyName: 'Sanchez', imageUrl: 'https://picsum.photos/50/50/?image=905', jwtToken: 'jwtToken_6', points: '14023621', role: 'user' },
];

async function seed() {
    await DB.init()
    DB.createMany('Users', fakeUsers)
    console.log('users seeded')
}

seed()
