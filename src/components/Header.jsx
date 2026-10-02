import {NavLink} from 'react-router-dom'

const navigationData = [
  {
    name: "Khám phá nghành",
    link: "/majorexplore",
  },

  {
    name: "Khám phá trường",
    link: "/universityexplore",
  },

  {
    name: "Công cụ tuyển sinh",
    link: "/admissiontool",
  },

  {
    name: "So sánh",
    link: "/compare",
  },

  {
    name: "Về UniView",
    link: "/about",
  },
];

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-bottom-sm px-4 py-2 border-b border-gray-200"> 
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Iaa</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
       <a className="btn btn-ghost text-xl"><img src="../public/logo.svg" alt="Logo"></img></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 flex gap-4">
          {navigationData.map((item, index) => (
            <li key={index}>
              <NavLink to={item.link} className={({ isActive }) => (isActive ? "active" : "")}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end w-500 flex justify-end gap-4">
        <a className="btn h-10 rounded-md bg-white  border-gray-300">Đăng nhập</a>
        <button className="btn h-10 w-50 bg-blue-600 text-white rounded-md flex gap-3">Bắt đầu khám phá <img src="../public/Container.svg" alt="Arrow"></img></button>
      </div>

      
    </div>
  );
};

export default Header;