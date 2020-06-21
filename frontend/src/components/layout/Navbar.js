import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          <i className="fas fa-sign-out-alt" />{' '}<span className='hide-sm'>SignOut</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (

    <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to='/serviceprovider' className="nav-link">
            Service Provider
                </Link>
        </li>
        <li className="nav-item">
          <Link to='/register' className="nav-link">
            Sign Up
                </Link>
        </li>
        <li className="nav-item">
          <Link to='/login' className="nav-link">
            Login
                </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" ><i className="fas fa-code" />
            Navigus
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </div>
    </nav>

  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
