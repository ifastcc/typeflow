import TypingPractice from './components/TypingPractice';
import sampleArticle from './data/sampleArticle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          TypeFlow
        </h1>
        <TypingPractice text={sampleArticle} />
      </div>
    </main>
  );
} 