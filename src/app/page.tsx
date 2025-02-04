import Image from 'next/image';

import URLCheck from './components/URLCheck';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">URL Checker</h1>
      <URLCheck />
      <Image src="image_01.jpeg" alt="photo" height={500} width={500}></Image>
      <img src="image_01.jpeg" alt="photos" height={500} width={500} />
    </main>
  );
}
