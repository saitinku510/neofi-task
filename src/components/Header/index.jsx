import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Logo from 'assets/images/neofiLogo.svg';

import 'components/Header/header.scss';

const Header = () => {

    const [activeNav, setActiveNav] = useState(false);

  return (
    <header className='nav'>
        <div className="container">
            <nav className='navContent'>
                <div className="navLogo">
                    <img src={Logo} alt="Brand logo" />
                    <div onClick={() => setActiveNav(!activeNav)} className={activeNav ? "navBars activeBars" : "navBars"}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <ul className={activeNav ? "navLinks active" : "navLinks"}>
                    <li><Link className='active' to="">Trade</Link></li>
                    <li><Link to="">Earn</Link></li>
                    <li><Link to="">Support</Link></li>
                    <li><Link to="">About</Link></li>
                </ul>
                <div className={activeNav ? "navCta active" : "navCta"}>
                    <div className="navCtaBorder">
                        <Link to="">Connect wallet</Link>
                    </div>
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Header