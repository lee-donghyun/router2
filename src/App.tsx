import "./App.css";
import { BrowserRouter, Link, matchDynamicRoute } from "./lib/router2";

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
      <Link pathname="/a">A</Link>
      <Link pathname="/b">B</Link>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>NOT FOUND. 404</h1>
    </div>
  );
};

const A = () => {
  return (
    <div>
      A
      <Link pathname="/b" query={{ v: "12" }}>
        to B (v=12)
      </Link>
    </div>
  );
};

const B = () => {
  return (
    <div>
      b<Link pathname="/a">to A</Link>
    </div>
  );
};
