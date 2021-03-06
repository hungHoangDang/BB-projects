import React from 'react';
import { NavLink, Link, Route, Switch } from 'react-router-dom'
import { Subscribe } from 'unstated';
import ArticlePreview from './ArticlePreview';
import UserContainer from '../containers/UserContainer';
import PostContainer from '../containers/PostContainer';

class Profile extends React.Component {
    componentDidMount = () => {
        PostContainer.getUserPosts( this.props.location.pathname );
        UserContainer.checkFollowingUser( this.props.location.pathname );
    }

    componentDidUpdate = (prevProps) => {
        if( this.props.location.pathname !== prevProps.location.pathname ) {
            let path = this.props.location.pathname.trim();
            let lastWord = PostContainer.takeLastWord( path );
            if (lastWord === 'favourites') {
                PostContainer.getFavouritePosts( this.props.location.pathname );
            } else {
                PostContainer.getUserPosts( this.props.location.pathname );
            }
        }
    }

    handleFollow = (e, followUser) => {
        e.preventDefault();
        followUser( this.props.location.pathname );
    }

    checkProfile = (pathname) => {
        return pathname.includes(localStorage.getItem("author"));
    }

    checkFollowing = (username) => {
        if (localStorage.getItem("following")) {
            return localStorage.getItem("following").includes(username);
        } else {
            return false;
        }
    }

    render() {
        return (
            <Subscribe to={[UserContainer, PostContainer]}>
                {
                    (userThings, postThings) => (
                        <div className="profile-page">
                        <div className="user-info">
                            <div className="container">
                                <div className="row">
                                    {
                                        postThings.state.author[0] ? 
                                        <div className="col-xs-12 col-md-10 offset-md-1">
                                            <img src={postThings.state.author[0].avaUrl} className="user-img" />
                                            <h4>{postThings.state.author[0].username}</h4>
                                            <p>
                                                {postThings.state.author[0].biography}
                                            </p>
                                            <button className="btn btn-sm btn-outline-secondary action-btn"
                                                onClick={(e) => this.handleFollow(e, postThings.followUser)}>
                                                
                                                {
                                                    this.checkProfile(this.props.location.pathname) ?
                                                        <Link to={`/settings/${localStorage.getItem("author")}`}>
                                                            <i className="ion-gear-a"></i>
                                                            &nbsp; Edit Profile Settings
                                                        </Link>
                                                            
                                                        : [
                                                            this.checkFollowing(postThings.state.author[0].username) ? 
                                                                <span key="unfollow">
                                                                    <i className="ion-plus-round"></i>
                                                                    &nbsp;
                                                                    Unfollow 
                                                                    &nbsp; 
                                                                    {postThings.state.author[0].username}
                                                                </span>
                                                                : 
                                                                <span key="follow">
                                                                    <i className="ion-plus-round"></i>
                                                                    &nbsp;
                                                                    Follow
                                                                    &nbsp; 
                                                                    {postThings.state.author[0].username}
                                                                </span>
                                                        ]
                                                        
                                                }    
                                            </button>
                                        </div> :
                                        ""
                                    }
                                </div>
                            </div>
                        </div>
    
                        <div className="container">
                            <div className="row">
    
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <div className="articles-toggle">
                                    {
                                        postThings.state.author[0] ? 
                                        <ul className="nav nav-pills outline-active">
                                            <li className="nav-item">
                                                <NavLink 
                                                    exact
                                                    className="nav-link"
                                                    activeClassName="active"
                                                    to={`/profile/${postThings.state.author[0].username}`}>
                                                    My Articles
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink  
                                                    className="nav-link"
                                                    to={`/profile/${postThings.state.author[0].username}/favourites`}>
                                                    Favorited Articles
                                                </NavLink>
                                            </li>
                                        </ul> : ""
                                    }
                                    </div>

                                    <Switch>
                                        <Route exact path="/profile/:username" key="userPosts" render={() => 
                                            postThings.state.data[0] ?
                                                postThings.state.data.map( p => 
                                                    <ArticlePreview key={p._id} {...p} />
                                                ): <div className="article-preview">Loading articles...</div>}/>

                                        <Route  path="/profile/:username/favourites" key="favourites" 
                                            render={() =>
                                                postThings.state.data[0] ?
                                                    postThings.state.data.map( p => 
                                                        <ArticlePreview key={p._id} {...p} />
                                                    ): <div className="article-preview">Loading articles...</div>
                                        }/>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </Subscribe>
        )
    }
}

export default Profile;