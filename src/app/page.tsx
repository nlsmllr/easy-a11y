import URLCheck from './components/URLCheck';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-100">URL Checker</h1>
      <URLCheck />
      <img src="image_01.jpeg" alt="photooo" height={500} width={500} />
    </main>
  );
}
