
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean,

}

export interface Author {
    id?: number,
    firstName: string,
    lastName: string,
}
export interface Topic {
    id: number,
    name: string
}

export interface Book {
    id?: number,
    title: string,
    descrpition: string,
    pages: number,
    releaseYear: number,
    author: Author,
    image: string,
    file?: string,
    topics: Topic[],
    reviews: Review[]
}

export interface Review {
    id?: number,
    content: string,
    rating: number,
    book?: Book,
    user?: User
}