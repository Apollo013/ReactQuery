import "./assets/styles/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { InfinitePeople } from "./components/people/InfinitePeople";
import { InfiniteSpecies } from "./components/species/InfiniteSpecies";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <h1>Infinite SWAPI</h1>
                {/**<InfinitePeople />**/}
                <InfiniteSpecies />
            </div>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
