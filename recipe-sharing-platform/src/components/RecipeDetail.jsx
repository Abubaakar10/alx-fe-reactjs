import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        Recipe Detail Page - ID: {id}
      </h1>
    </div>
  );
}

export default RecipeDetail;
