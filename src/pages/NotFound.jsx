export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-8">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-xl text-zinc-300 mb-2">Page Not Found</p>
      <p className="text-zinc-500">The page you are looking for does not exist.</p>
    </div>
  );
}