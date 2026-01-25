import { useParams } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
    const { id } = useParams();

    const recipe = useRecipeStore((state) =>
        state.recipes.find((recipe) => recipe.id === Number(id))
    );

    const favorites = useRecipeStore((state) => state.favorites);
    const addFavorite = useRecipeStore((state) => state.addFavorite);
    const removeFavorite = useRecipeStore(
        (state) => state.removeFavorite
    );

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    const isFavorite = favorites.includes(recipe.id);

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>

            {isFavorite ? (
                <button onClick={() => removeFavorite(recipe.id)}>
                    Remove from Favorites
                </button>
            ) : (
                <button onClick={() => addFavorite(recipe.id)}>
                    Add to Favorites
                </button>
            )}

            <EditRecipeForm recipe={recipe} />
            <DeleteRecipeButton recipeId={recipe.id} />
        </div>
    );
};

export default RecipeDetails;
