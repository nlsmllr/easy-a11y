import Image from 'next/image';

import URLCheck from './components/URLCheck';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">URL Checker</h1>
      <URLCheck />
      <Image src="image_01.jpeg" alt="abstract waves" height={500} width={500} />
      {/* The following lines are only examples to test the ESLint plugin */}
      {/* <Image src="image_01.jpeg" height={250} width={250} /> */}
      {/* <Image src="image_01.jpeg" alt="" height={250} width={250} /> */}
      {/* <Image src="image_01.jpeg" alt="photo" height={250} width={250} /> */}
    </main>
  );
}
