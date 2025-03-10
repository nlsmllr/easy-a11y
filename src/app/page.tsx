/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y-check/no-generic-alt-values */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import Link from 'next/link';

import URLCheck from './components/URLCheck';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      {/* Incorrect heading hierarchy */}
      <h3 className="text-2xl font-bold text-gray-50">Main Title</h3>
      <h1 className="text-xl font-bold text-gray-50">Subtitle</h1>
      <h2 className="text-lg font-bold text-gray-50">Section</h2>

      {/* Links with accessibility issues */}
      <Link href="/" className="text-[1px] text-gray-50">
        Invisible Link
      </Link>
      <Link href="/" tabIndex={-1} className="text-gray-50">
        Hidden from Tab Order
      </Link>

      {/* Form with accessibility issues */}
      <form className="mt-4">
        <input type="text" className="border p-2" />
        <label className="text-gray-50">Email</label>
        <input type="email" className="border p-2" />
        <button type="submit" className="bg-gray-700 p-2 text-gray-700">
          Submit
        </button>
      </form>

      {/* Button with only icon */}
      <button className="bg-blue-500 p-2">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </button>

      {/* Image with poor alt text */}
      <Image src="/image_01.jpeg" alt="image" height={500} width={500} />

      {/* Modal without proper ARIA attributes */}
      <div className="fixed inset-0 bg-black bg-opacity-50">
        <div className="bg-white p-4">
          <h2>Modal Title</h2>
          <p>Modal content</p>
        </div>
      </div>

      {/* Table without proper structure */}
      <table className="mt-4">
        <tbody>
          <tr>
            <td>Header 1</td>
            <td>Header 2</td>
          </tr>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
        </tbody>
      </table>

      {/* Content with poor color contrast */}
      <p className="text-gray-400">This text has poor contrast</p>
      <p className="text-gray-500">This text has even worse contrast</p>

      {/* Autoplay video without controls */}
      <video autoPlay loop className="mt-4">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Interactive element without proper role */}
      <div role="button" className="cursor-pointer bg-gray-800 p-2">
        Click me
      </div>

      <URLCheck />
    </main>
  );
}
