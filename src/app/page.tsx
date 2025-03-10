/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y-check/no-generic-alt-values */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      {/* Incorrect heading hierarchy */}
      <h3 className="text-2xl font-bold text-gray-50">Main Title</h3>
      <h1 className="text-xl font-bold text-gray-50">Subtitle</h1>
      <h2 className="text-lg font-bold text-gray-50">Section</h2>

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
    </main>
  );
}
