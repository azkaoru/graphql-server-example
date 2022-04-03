var _id = 0;
var photos = []
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
    },
    Mutation: {
        postPhoto(parent,args){
            var newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto)
            return newPhoto
        }
    },
    Photo: {
        url: parent => 'http://yousite.com/img/${parent.id}.jpg'
    }
};

module.exports = resolvers