import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {

  const error = useRouteError();

  return (
    <div className="error-container">
      <div className="error-icon">📺</div>
      <h1 className="error-title">{error?.status} - Page {error?.statusText}</h1>
      <p className="error-message">
        Oops! The page you're looking for doesn't exist. It might have been removed,
        renamed, or just never existed.
      <br /><br />
      <p>{error?.data}</p>
      </p>
      <Link to="/" className="home-button">Back to Home</Link>
    </div>
  );
}
