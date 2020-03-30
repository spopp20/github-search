import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const UserProfile = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    avatar_url,
    bio,
    blog,
    company,
    email,
    followers,
    following,
    hireable,
    html_url,
    location,
    login,
    name,
    public_gists,
    public_repos,
    site_admin,
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
    );
};

export default UserProfile
