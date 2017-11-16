let users = [
    {
        name: 'Shreyansh Pandey',
        username: 'labsvisual',
        password: 'password',
        email: 'me@isomr.co',
        guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
    }
];

let birds = [
    {
        owner: '',
        species: 'Columbidae',
        name: 'Pigeon',
        picture_url: 'http://pngimg.com/upload/pigeon_PNG3423.png',
        guid: '4c8d84f1-9e41-4e78-a254-0a5680cd19d5',
        isPublic: true,
    },
    {
        owner: '',
        species: 'paleognaths',
        name: 'yellow-wattled lapwing',
        picture_url: 'http://pngimg.com/upload/pigeon_PNG3423.png',
        guid: '5d9e95g2-9e41-4e78-a254-1b6791de21e6',
        isPublic: true,
    },
    {
        owner: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
        species: 'Zenaida',
        name: 'Mourning dove',
        picture_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_2006.jpg/220px-Mourning_Dove_2006.jpg',
        guid: 'ddb8a136-6df4-4cf3-98c6-d29b9da4fbc6',
        isPublic: false,
    },
    {
        owner: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
        name: 'Hummingbird',
        species: 'Trochilidae',
        picture_url: 'http://www.icesi.edu.co/wiki_aves_colombia/img/tiki/header.jpg',
        guid: '40758357-a9a0-417e-818a-a796c06db051',
        isPublic: true
    }
];

function getBirds() {
    return birds;
}

function getUsers() {
    return users;
}

function createBird(bird) {
    const positionBird = birds.push(bird);
    return birds[positionBird-1];
}

function updateBird(index, bird) {
    return birds[index] = bird;
}

function deleteBird(index) {
    return birds.splice(index, 1);
}

module.exports = {
    'getBirds' : getBirds, 'getUsers' : getUsers, 'createBird' : createBird, 'updateBird' : updateBird, 'deleteBird' : deleteBird
};



