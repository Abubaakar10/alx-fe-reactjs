import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.find((r) => r.id === parseInt(id));
    setRecipe(found);
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <p className="text-gray-700 mb-4">{recipe.summary}</p>
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients
          ? recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
          : ["Ingredient 1", "Ingredient 2", "Ingredient 3"]}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700">
        {recipe.instructions || "Step 1: Do something. Step 2: Do something else."}
      </p>
    </div>
  );
}

export default RecipeDetail;

