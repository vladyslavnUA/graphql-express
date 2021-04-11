const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// schema
// const schema = buildSchema(`
// type About {
//   message: String!
// }

// type Meal {
// 	description: String!
// }

// enum MealTime {
//     breakfast
//     lunch
//     dinner
// }

// type Query {
//     getAbout: About
//       getmeal(time: MealTime!): Meal
// }

// type Pet {
//     name: String!
//     species: String!
// }

// type PetQuery {
//     getPet(id: Int!): Pet
//     allPets: [Pet!]!
// }

// `)

// const petList = [
// 	{ name: 'Fluffy', species: 'Dog' },
// 	{ name: 'Sassy', species: 'Cat' },
// 	{ name: 'Goldberg', species: 'Frog' }
// ]

// // resolver
// const root = {
//     getAbout: () => {
//         return { message: 'Hello World' }
//     },
//     getmeal: ({ time }) => {
//         const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
//         const meal = allMeals[time]
//         return { description: meal }
//     },
//     getPet: ({ id }) => {
//         return petList[id]
//     },
//     allPets: () => {
//         return petList
//     }
// }


// CHALLENGE 1

const bookList = [
	{ title: 'War and Peace', author: 'Leo Tolstoy', pageCount: 1225, pubYear: 1867 },
	{ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pageCount: 218, pubYear: 1925 },
	{ title: 'Middlemarch', author: 'George Eliot', pageCount: 880, pubYear: 1871 },
    { title: 'The Alchemist', author: 'Paulo Coelho', pageCount: 208, pubYear: 1988 },
    { title: 'Hamlet', author: 'William Shakespeare', pageCount: 214, pubYear: 1603 },
    { title: 'Moby Dick', author: 'Herman Melville', pageCount: 378, pubYear: 1851 },
    { title: 'Don Quixote', author: 'Miguel de Cervantes', pageCount: 2823, pubYear: 1605 },
    { title: 'Ulysses', author: 'James Joyce', pageCount: 730, pubYear: 1922 },
    { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', pageCount: 448, pubYear: 1967 },
    { title: 'A Tale of Two Cities', author: 'Charles Dickens', pageCount: 448, pubYear: 1859 },
]

const TimeList = [
    { hour: '1pm', second: '24s', minute: '04m'}
]

// const genreList = [
//     // { Novel: ['The Great Gatsby', 'One Hundred Years of Solitude', 'Moby Dick', 'Middlemarch', 'Hamlet', 'War and Peace'], Fiction: ['A Tale of Two Cities'], Adventure: ['Ulysses', 'Don Quixote', 'The Alchemist']}
//     { Novel: 'The Great Gatsby', Fiction: 'A Tale of Two Cities', Adventure: 'Ulysses'}
// ]

// CHALLENGE 2

const schema = buildSchema(`
enum Genre {
    Novel
    Fiction
    Adventure
}

enum Time {
    hour
    second
    minute
}

type Book {
	title: String!
    author: String!
    pageCount: Int!
	pubYear: Int!
    genre: Genre!
}

type Roll {
	total: Int!
    sides: Int!
    rolls: [Int]!
}

type Query {
    allBooks: [Book] 
    getBook(index: Int!): Book
    getLast: Book
    getFirst: Book
    getTime: [Time]
    getRandom: Int
    getRoll(sides: Int!, rolls: Int!): Roll
    bookCount: Int
    bookFromTo(start: Int!, end: Int!): [Book]
}
`)


// CHALLENGE 3

const root = {
    allBooks: () => {	
        return bookList
    },
    allNovels: () => {	
        return bookList
        // bookList.title = 'The Great Gatsby', 'One Hundred Years of Solitude', 'Moby Dick', 'Middlemarch', 'Hamlet', 'War and Peace'
        // return bookList['author': author]
    },
    getBook: ({ index }) => { 
        return bookList[index]
    },
    getLast: () => { 
        return bookList[bookList.length-1]
    },
    getFirst: () => { 
        return bookList[0]
    },
    bookCount: () => { 
        return bookList.length
    },
    bookFromTo: ({start, end}) => {
        return bookList.slice(start, end)
    },
    getGenre: ({ genre }) => {
        const genreList = { novel: 'The Great Gatsby', fiction: 'A Tale of Two Cities', adventure: 'Ulysses' }
        const thegenre = genreList[genre]
        return thegenre
    },
    getTime: () => {
        return TimeList
    },
    getRandom: ({sides}) => { 
        return Math.floor(Math.random() * (sides - 1 + 1)) + 1;
    },
    getRoll: ({ sides, rolls }) => {
        const all = []
        for (i=0; i<rolls; i++) {
            const rand = Math.floor(Math.random() * (sides - 1 + 1)) + 1;
            all.push(rand)
            console.log(i, rand)
        }
        
        var sum = all.reduce(function (a, b){
            return a+b;
        }, 0);
        return { total: sum, sides: sides, rolls: all}
    }
}

// CHALLENGE 4

// Displays all books properly


// CHALLENGE 5



const app = express()

// route
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = 3000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})