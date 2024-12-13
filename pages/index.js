// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Christmas Page</h1>
      <p>Check out the comments at <Link href="/christmas">/christmas</Link>!</p>
    </div>
  );
}
