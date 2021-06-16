import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import style from "../css/ErrorPage.module.css";

function ErrorPage({ code, status, msg }) {
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div className={style.errorPage}>
      <div className={style.columns}>
        <div>
          {code && <span className={style.code}>{code}</span>}

          <h1>{status || "Error"}</h1>

          <p>
            {msg || "Unfortunately, something seems to have gone VERY wrong."}
          </p>

          <p>
            Please <Link to="/">click here</Link> to go back to safety. Or wait
            5 seconds to be redirected automatically.
          </p>
        </div>

        <img src="/assets/icons/error.png" alt="Logo" />
      </div>
    </div>
  );
}

ErrorPage.Unauthorized = () => (
  <ErrorPage
    code={401}
    status="Unauthorized"
    msg="We are sorry but we were not able to authenticate you."
  />
);

ErrorPage.Forbidden = () => (
  <ErrorPage
    code={403}
    status="Forbidden"
    msg="We are sorry but the requested resource is not accessible at this time."
  />
);

ErrorPage.NotFound = () => (
  <ErrorPage
    code={404}
    status="Not Found"
    msg="We are sorry but the requested resource could not be found."
  />
);

export default ErrorPage;
