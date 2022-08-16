import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Clients from "./components/Clients";
import AddClientsModel from "./components/addClientsModel";
import Projects from "./components/Projects";

const cache = new InMemoryCache({
  typePolicies: {
    Queries: {
      fields: {
        clients: {
          merge(existing, incoming){
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          },
        },
      }
    }
  }
})
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
      <Header></Header>
      <div className="container">
        <AddClientsModel></AddClientsModel>
        <Projects></Projects>
        <Clients></Clients>
      </div>
      </ApolloProvider>
    </>
    
  );
}

export default App;
