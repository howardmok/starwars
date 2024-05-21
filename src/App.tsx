import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchWrapper from "./components/SearchWrapper";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchWrapper />
    </QueryClientProvider>
  );
};

export default App;
