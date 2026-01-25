import { create } from 'zustand';

const useRecipeStore = create((set) => ({
    recipes: [],

    addRecipe: (newRecipe) =>
        set((state) => ({
            recipes: [...state.recipes, newRecipe],
        })),

    deleteRecipe: (id) =>
        set((state) => ({
            recipes: state.recipes.filter((recipe) => recipe.id !== id),
        })),

    updateRecipe: (updatedRecipe) =>
        set((state) => ({
            recipes: state.recipes.map((recipe) =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            ),
        })),

    /* 🔍 SEARCH & FILTER */
    searchTerm: '',
    filteredRecipes: [],

    setSearchTerm: (term) => set({ searchTerm: term }),

    filterRecipes: () =>
        set((state) => ({
            filteredRecipes: state.recipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(
                    state.searchTerm.toLowerCase()
                )
            ),
        })),
}));

export default useRecipeStore;
