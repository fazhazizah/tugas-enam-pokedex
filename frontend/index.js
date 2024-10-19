let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Function to get type-specific colors with vibrant colors
function getTypeColor(type) {
  const colors = {
    fire: { bg: "bg-red-500", border: "border-orange-500" },
    water: { bg: "bg-blue-500", border: "border-blue-300" },
    grass: { bg: "bg-green-500", border: "border-lime-400" },
    electric: { bg: "bg-yellow-500", border: "border-yellow-300" },
    psychic: { bg: "bg-pink-500", border: "border-purple-300" },
    ice: { bg: "bg-cyan-300", border: "border-teal-200" },
    dragon: { bg: "bg-purple-600", border: "border-indigo-400" },
    fairy: { bg: "bg-pink-400", border: "border-pink-300" },
    normal: { bg: "bg-amber-400", border: "border-amber-300" },
    dark: { bg: "bg-gray-800", border: "border-black" },
    fighting: { bg: "bg-orange-500", border: "border-orange-400" },
    poison: { bg: "bg-red-500", border: "border-purple-400" },
    ground: { bg: "bg-yellow-600", border: "border-yellow-500" },
    flying: { bg: "bg-sky-400", border: "border-sky-300" },
    bug: { bg: "bg-lime-500", border: "border-lime-400" },
    rock: { bg: "bg-yellow-700", border: "border-yellow-600" },
    ghost: { bg: "bg-indigo-600", border: "border-indigo-500" },
    steel: { bg: "bg-gray-600", border: "border-gray-500" },
  };
  return colors[type] || { bg: "bg-gray-200", border: "border-gray-100" };
}

// Card component with gradient background and height/weight display
function PokemonCard({ id, name, types, image, height, weight, gradientColor }) {
  return React.createElement(
    "div",
    {
      className:
        `bg-gradient-to-b ${gradientColor} shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl p-6 m-4 w-80 text-center relative overflow-hidden border-4 border-white`,
      style: { borderRadius: '30px' },
    },
    React.createElement(
      "div",
      {
        className:
          "w-40 h-40 mx-auto flex items-center justify-center relative rounded-full overflow-hidden mb-4",
      },
      React.createElement("img", {
        src: image,
        alt: name,
        className:
          "w-36 h-36 rounded-full border-4 border-white shadow-md relative z-10",
      })
    ),
    // ID displayed above the name without #
    React.createElement(
      "h3",
      { className: "text-lg font-semibold text-white mt-2" },
      id
    ),
    React.createElement(
      "h2",
      { className: "text-2xl font-bold text-white mt-1 drop-shadow-lg" },
      name
    ),
    React.createElement(
      "div",
      { className: "flex justify-center mt-2" },
      types.map((type) => {
        const { bg, border } = getTypeColor(type);
        return React.createElement(
          "span",
          {
            key: type,
            className:
              `${bg} ${border} border-2 text-white text-lg font-semibold py-2 px-4 rounded-full mr-2 shadow-lg`,
          },
          type
        );
      })
    ),
    React.createElement(
      "div",
      { className: "mt-4 flex justify-between items-center text-white px-6" },
      // Height section with icon
      React.createElement(
        "div",
        { className: "flex items-center gap-2" },
        React.createElement("img", {
          src: "https://img.icons8.com/ios-glyphs/30/ffffff/ruler.png",
          alt: "Height",
          className: "w-6 h-6 transition-transform transform hover:scale-125",
        }),
        React.createElement(
          "span",
          { className: "text-lg font-semibold" },
          `${(height / 10).toFixed(1)} m`
        )
      ),
      // Weight section with icon
      React.createElement(
        "div",
        { className: "flex items-center gap-2" },
        React.createElement("img", {
          src: "https://img.icons8.com/ios-glyphs/30/ffffff/scale.png",
          alt: "Weight",
          className: "w-6 h-6 transition-transform transform hover:scale-125",
        }),
        React.createElement(
          "span",
          { className: "text-lg font-semibold" },
          `${(weight / 10).toFixed(1)} kg`
        )
      )
    )
  );
}

// List component to render multiple cards
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-xl text-gray-600 mt-10" },
      "Loading Pokémon data..."
    );
  }

  const gradients = [
    "from-black to-purple-800",
    "from-black to-red-800",
    "from-black to-green-800",
    "from-black to-blue-800",
  ];

  return React.createElement(
    "div",
    {
      className:
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center mt-8",
    },
    pokemonData.map((pokemon, index) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        height: pokemon.height,
        weight: pokemon.weight,
        gradientColor: gradients[index % gradients.length],
      })
    )
  );
}

// App component with updated header
function App() {
  return React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-gradient-to-b from-black to-gray-900 p-8 flex flex-col items-center",
    },
    React.createElement(
      "header",
      { className: "text-center mb-5" },
      React.createElement(
        "h1",
        { className: "text-5xl font-extrabold text-white drop-shadow-md mb-2" },
        "Welcome to the Ultimate Pokedex"
      ),
      React.createElement(
        "p",
        { className: "text-lg text-gray-300" },
        "Discover and explore Pokémon from all generations!"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Fetch and display Pokémon data
fetchPokemon();
