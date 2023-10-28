import "./navbar.css";

let Navbar = () => {
    return (
        <nav id="Navbar">
            <div className="navbar flex flex-row p-1 gap-10 justify-between px-2">
                <div className="logo flex flex-row items-center gap-2">
                    <img src={require("../../img/techno_img.png")} className="w-14" alt=''/>
                    <p className="text-4xl">TECHNOVANZA</p>
                </div>
                <div className="nav-items flex flex-row items-center gap-10 text-lg">
                    <p>Home</p>
                    <p>Events</p>
                    <p>GLS</p>
                    <p>Gallery</p>
                    <p>Team</p>
                    <p>Login</p>
                </div>
                <div className="nav-moto flex flex-row items-center text-lg" >
                    <p>Join the asia's second largest tech fest</p>
                </div>


            </div>

        </nav>

    );
}

export default Navbar;