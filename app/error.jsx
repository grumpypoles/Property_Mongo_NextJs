'use client';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = ({ error, reset }) => {
  return (
    <section className='flex-grow min-h-screen bg-blue-50'>
      <div className='container max-w-2xl py-24 m-auto'>
        <div className='px-6 py-24 m-4 mb-4 bg-white border rounded-md shadow-md md:m-0'>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='text-red-400 fas fa-exclamation-triangle fa-5x text-8xl'></FaExclamationTriangle>
          </div>
          <div className='text-center'>
            <h1 className='mt-4 mb-2 text-3xl font-bold'>
              Something went wrong!
            </h1>
            <h2 className='my-2 text-2xl font-bold text-red-400'>
              {error.message}
            </h2>
            <p className='my-5 text-xl text-gray-500'>
              Shall we try again? ...
            </p>
            <button
              onClick={() => reset()}
              className='px-6 py-4 font-bold bg-yellow-500 rounded hover:bg-yellow-600'
            >
              Try again
            </button>
            <p className='my-5 text-xl text-gray-500'>Or back to home...</p>
            <Link
              href='/'
              className='inline-block px-6 py-4 font-bold text-white bg-blue-700 rounded hover:bg-blue-800'
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};
export default ErrorPage;
