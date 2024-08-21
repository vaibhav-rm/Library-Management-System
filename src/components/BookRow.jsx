import React from 'react';

function BookRow({ books, branch }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{branch}</h2>
      <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-6">
        {books.slice(0, 10).map((book) => (
          <div
            key={book.id}
            className="min-w-[150px] flex-shrink-0 transition-transform transform hover:scale-105"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-[250px] object-cover rounded-lg shadow-lg"
            />
            <p className="text-center mt-2 text-base font-medium truncate">{book.title}</p>
          </div>    
        ))}
        {books.length > 10 && (
          <div className="min-w-[150px] flex-shrink-0">
            <div className="w-full h-[250px] flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
              <button className="text-blue-600 underline whitespace-nowrap">
                Show more of this branch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookRow;
