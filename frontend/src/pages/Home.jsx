import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
// import { AiOutLineEdit } from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md'
import api from '../api'

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true);
        api.get('/')
            .then(response => {
                setBooks(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create' >
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-seperate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Author
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                            <th className='border border-slate-600 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {book.title}
                                </td>
                                <td className='border border-slate-700 rounded-md max-md:hidden'>
                                    {book.author}   
                                </td>
                                <td className='border border-slate-700 rounded-md max-md:hidden'>
                                    {book.publish_year}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${book.id}`}>
                                            <BsInfoCircle className='text-sky-800 text-2xl' />
                                        </Link>
                                        <Link to={`/books/edit/${book.id}`}>
                                            <BsInfoCircle className='text-sky-800 text-2xl' />
                                        </Link>
                                        <Link to={`/books/delete/${book.id}`}>
                                            <MdOutlineDelete className='text-sky-800 text-2xl' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                            ))}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default Home