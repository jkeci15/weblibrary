import React, { useState, useEffect,useCallback } from 'react'
import Card from "../Card";
import BookList from "./BookList"
import './BookWrapper.css'
const BookWrapper = () => {

    // const BOOKS = [
    //     {
    //         id: 1,
    //         title: 'Old man and the sea',
    //         author: 'Hemingway',
    //         description: 'A book about human vs nature',
    //         categories: 'fan-fiction',
    //         image: '../../../public/Images/old_man_and_sea.jpg'
    //     },
    //     {
    //         id: 2,
    //         title: 'DaVinci Code',
    //         author: 'Dan Brown',
    //         description: 'Mystery Holy grail',
    //         categories: 'fan-fiction',
    //         image: './public/Images/davinci_code.jpg'
    //     }
    // ];
   

    const [books, setBooks] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchBooksHandler = useCallback( async() => {
        setisLoading(true)
        setError(null)
        try {
            const response = await fetch('/books')
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const transformedBooks = data.map((book) => {
                return {
                    id: book._id,
                    title: book.name,
                    description: book.description,
                    bookCover: book.bookCover,
                    author: book.author,
                    categories: book.categories
                }
            })
            setBooks(transformedBooks)
        } catch (error) {
            setError(error.message)
        }
        setisLoading(false)
    },[])

    useEffect(()=>{
        fetchBooksHandler();
    },[fetchBooksHandler])

    let bookContent = <p>Found no Books!</p>
    if (books.length > 0) {
        bookContent = <Card className="books">
            <BookList books={books} />
        </Card>
    }
    if (error) {
        bookContent = <p>{error}</p>
    }
    if (isLoading) {
        bookContent = <p>Loading....</p>
    }

    return (
        <div>
            <section>
                {bookContent}
            </section>
        </div>

    )
}

export default BookWrapper