import { readFile } from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '../../lib/types';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

// Generate static paths for all recipe slugs
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const jsonData = await readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Fetch data for a specific recipe
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const jsonData = await readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
    },
  };
}

interface RecipePageProps {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: RecipePageProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SignedOut>
        <div className="text-center mt-20">
          <p className="text-lg text-gray-700 mb-4">Please sign in to view this recipe.</p>
          <SignInButton>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-orange-600 mb-4">{recipe.title}</h1>

          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Preparation Steps</h2>
          <ol className="list-decimal list-inside mb-6">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-700 mb-2">{step}</li>
            ))}
          </ol>

          <Link href="/" className="text-orange-500 hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}


