import { useParams } from "react-router-dom";

export default function FlavorDetail() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Flavor Detail</h1>
      <p className="text-zinc-400">Viewing details for slug: <span className="text-emerald-400 font-mono">{slug}</span></p>
    </div>
  );
}