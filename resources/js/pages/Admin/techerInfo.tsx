import { Link } from '@inertiajs/react';
export default function SearchBar() {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <div><input
          type="text"
          placeholder="Enter teacher's nic"
          className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          //value={searchTerm}
          //onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href="/teacher_details">
                            <button className="bg-red-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-black transition-all ml-auto block">
                                 Search
                            </button>
        </Link>
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M15 10a5 5 0 10-10 0 5 5 0 0010 0z"
          />
        </svg>
        </div>
        <div>
            <div>
            <h1 className="text-3xl font-bold text-gray-800">teacher's personal informations</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">teacher's address informations</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>

            <h1 className="text-3xl font-bold text-gray-800">teacher's work informations</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>

            <h1 className="text-3xl font-bold text-gray-800">teacher's qualifications</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            <h1 className="text-3xl font-bold text-gray-800">teacher's other services</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>

        </div>
      </div>
      
    );
  }
  