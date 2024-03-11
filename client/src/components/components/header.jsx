import { Fragment } from "react";

export default function Header({ logout, user }) {
  return (
    <Fragment>
      <div className="header-container">
        <h1 style={{color:"white"}}>ROPA</h1>
        <div className="header-subtext">
          <div>{user?.user?.username}</div>
          <div>
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
