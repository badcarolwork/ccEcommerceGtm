import "./navbar.scss";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const NavBar = ({ categories }) => {
  const baseuri = "/gtm-cc";

  // handle GTM
  const handleNavclick = (e) => {
    const _this = e.target;
    const current = _this.id;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "navigationClick",
      category: "Navigation",
      action: "click",
      label: current,
      text: _this.innerText,
      classes: _this.getAttribute("class"),
      btn_id: _this.id,
    });
  };
  return (
    <div className="container-fluid top-nav">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`${baseuri}/`}>
            <img src={logo} alt="" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((cat) =>
              !cat.sub ? (
                <div
                  className="nav-item navbar-collapse"
                  key={cat.cat_id}
                  id={cat.cat_id}
                  onClick={handleNavclick}
                >
                  <Link
                    className="nav-link"
                    id={cat.cat_id}
                    to={`${baseuri}/products/${cat.cat_id}`}
                  >
                    {cat.name}
                  </Link>
                </div>
              ) : (
                <div className="col-4 nav-item dropdown" key={cat.cat_id}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {cat.name}
                  </a>

                  <ul className="dropdown-menu">
                    {cat.sub.map((c) => (
                      <li key={c.cat_id} onClick={handleNavclick} id={c.cat_id}>
                        <Link
                          className="nav-link dropdown-item"
                          id={c.cat_id}
                          to={`${baseuri}/products/${c.cat_id}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </ul>
          <div className="cart-btn btn btn-outline-secondary">
            <Link to={`${baseuri}/checkout`} id="myCart" className="my-cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <span>My Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
