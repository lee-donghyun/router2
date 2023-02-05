import "./App.css";
import {
  BrowserRouter,
  Link,
  matchDynamicRoute,
  useRouter,
} from "./lib/router2";

function App() {
  return (
    <div>
      <BrowserRouter
        routes={{
          "/": Index,
          "/a": A,
          "/a/:about": B,
          "/b": B,
          "/404": NotFound,
        }}
        match={matchDynamicRoute}
      />
    </div>
  );
}

export default App;

const Index = () => {
  return (
    <div>
      <h1>Router 2</h1>
      <Current />
      <Link pathname="/a">A</Link>
      <Link pathname="/b">B</Link>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <Current />
      <h1>NOT FOUND. 404</h1>
    </div>
  );
};

const A = () => {
  return (
    <div>
      <Current />A
      <Link pathname="/b" query={{ v: "12" }}>
        to B (v=12)
      </Link>
    </div>
  );
};

const B = () => {
  return (
    <div>
      <Current />b<Link pathname="/a">to A</Link>
    </div>
  );
};

const Current = () => {
  const { pathname, path, params } = useRouter();
  return <p>{JSON.stringify({ pathname, path, params })}</p>;
};
