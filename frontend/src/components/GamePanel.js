import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function GamePanel(props) {
  useEffect(() => {
    alert("rendring");
    return () => {
      alert("un");
    };
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="page1">Sample Page1</Link>
          </li>
          <li>
            <Link to="page2">Sample Page2</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
