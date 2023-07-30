import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <main>
      <Virtual childrenHeight={150}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <div key={i} className="box">
            {i}
          </div>
        ))}
      </Virtual>
    </main>
  );
}

function Virtual({ children, childrenHeight }) {
  const [lastIndex, setLastIndex] = useState();
  const [perScreen, setPerScreen] = useState();

  console.log(children);

  useEffect(() => {
    evaluate();
    window.addEventListener('scroll', evaluate);

    return () => {
      window.removeEventListener('scroll', evaluate);
    };
  }, []);

  function evaluate() {
    const documentHeight = window.innerHeight;
    const scrollY = window.scrollY;

    let _last = Math.floor(scrollY / childrenHeight);
    const childToShow = Math.ceil(documentHeight / childrenHeight);

    setLastIndex(_last);
    setPerScreen(childToShow);

    console.log('scrollY', _last);
    console.log('childToShow on screen', childToShow);
  }

  return (
    <div style={{ height: childrenHeight * children.length }}>
      {children.slice(lastIndex, lastIndex + 1 + perScreen)}
    </div>
  );
}

export default App;
