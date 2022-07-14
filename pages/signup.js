import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useUserContext } from '../context/userContext'
import { auth } from '../firebase'
import { toast } from 'react-toastify'


const Signup = () => {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')


    const { error, registerUser, setError } = useUserContext()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, { displayName: name })
            toast.success('Your acc has been created successfully!')
            router.push('/')
        } catch (error) {
            toast(error.code, { type: "error" })
        }
    }

    return (
        <section className="text-gray-600 body-font mx-auto flex justify-center items-center ">

            <div className="container px-5 py-24 flex justify-center items-center">

                <form onSubmit={onSubmit} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0">

                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>

                    <div className=" mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign Up</button>

                    {error && <p className="text-red-500 text-sm py-3">{error}</p>}

                    <Link href={'/login'}>
                        <p className='text-sm text-blue-600 my-6 cursor-pointer'>Already have an account? Sign In </p>
                    </Link>

                </form>
            </div>

        </section>
    )
}

export default Signup