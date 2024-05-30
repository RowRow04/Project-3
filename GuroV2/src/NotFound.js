import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="my-44 p-2 block justify-center text-center">
        Page Not Found,{" "}
        <Link to="/">
          <span>Go Back Home.</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
