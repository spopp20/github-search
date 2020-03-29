import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// Dispaly detailed information about the user
const UserProfile  = ({ user, loading, getUser, getUserRepos, repos, match }) => {
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line  
    }, []);

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        email,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        site_admin,
        hireable
    } = user;

    if (loading) return <Spinner />;

    return (
        <Fragment>
        <Link to='/' className='btn btn-light'>
            Back to Search
        </Link>
        Hireable: {' '}
        {hireable ? (
            <i className="fas fa-check text-success" />
        ) : (
            <i className="fas fa-times-circle text-danger" />
        ) }
        <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url} className="round-img" alt='' style={{ width: '150px' }} />
                <h1>{name}</h1>
                <p><strong>Location:</strong> {location}</p>
            </div>
            <div>
                {bio && (
                <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </Fragment>
                )}
                <a href={html_url} className='btm btm-dark my-1'>
                    Visit GitHub Profile
                </a>
                <ul>
                    <li>
                        {login && <Fragment>
                            <strong>Username: </strong> {login}
                            </Fragment>}
                    </li>
                    <li>
                        {email && <Fragment>
                            <strong>Email: </strong> {email}
                            </Fragment>}
                    </li>
                    <li>
                        {company && <Fragment>
                            <strong>Company: </strong> {company}
                            </Fragment>}
                    </li>
                    <li>
                        {blog && <Fragment>
                            <strong>Blog: </strong> {blog}
                            </Fragment>}
                    </li>
                    <li>
                        {email && <Fragment>
                            <strong>Username: </strong> {email}
                            </Fragment>}
                    </li>
                    <li>
                        {site_admin && <Fragment>
                            <strong>Site Administrator: </strong> {site_admin}
                            </Fragment>}
                    </li>
                </ul>
            </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-secondary">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
        </Fragment>
    )
}

UserProfile.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
}

export default UserProfile
