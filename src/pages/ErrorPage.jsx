import {useRouteError} from "react-router";

export function ErrorPage() {
  const error = useRouteError();
  return <div>
    {error.status === 404
      ? <div className="not-found">
        <h1>404 Not Found</h1>
        <span>
          The page you are looking for does not exist.
        </span>
      </div>
      : <div>{JSON.stringify(error)}</div>

    }
  </div>
}