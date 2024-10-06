import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import GlobalStyles from "@styles/GlobalStyles";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Helmet>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
          </Helmet>
          <GlobalStyles />
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
