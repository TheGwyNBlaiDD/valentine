import OrientationGuard from "./components/OrientationGuard";
import PhotoPairGame from "./components/PhotoPairGame";
import TextFooter from "./components/TextFooter";


export default function Home() {
  return (
    <OrientationGuard>
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-3xl font-semibold">Valentine Game</h1>
        <PhotoPairGame />
        <TextFooter />
      </main>
    </OrientationGuard>
  );
}
