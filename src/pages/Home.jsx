import React from 'react';
import BookList from '../components/BookList';

function Home() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-full mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800">Library Management System</h1>
        <BookList />
      </div>
    </div>
  );
}

export default Home;
