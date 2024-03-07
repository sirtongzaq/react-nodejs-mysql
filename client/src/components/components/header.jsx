import { Fragment } from "react";

export default function Header(){
    return (
        <Fragment>
            <div className="header-container">
                <h1>Header</h1>
                <div className="header-subtext">
                    <div>
                        $user
                    </div>
                    <div>
                        <button>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}