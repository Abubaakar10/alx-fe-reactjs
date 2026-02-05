import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          GitHub User Search
        </h1>
        <Search />
      </div>
    </div>
  );
}

export default App;
