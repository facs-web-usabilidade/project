import "../styles/hamburger-menu.css";

const HamburgerMenu = ({ onClick }) => (
    <button id="hamburger_menu_icon" onClick={onClick}>
        <img src="/images/hamburger_menu_icon.png"/>
    </button>
);

export default HamburgerMenu;