import { Link } from "react-router-dom";

import style from "../css/ErrorPage.module.css";

function ErrorPage(props) {
  const { code, status, msg } = props;

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
            Please try again later, or go <Link to="/">back to safety.</Link>
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
