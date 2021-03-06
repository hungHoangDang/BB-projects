import React from 'react';
import { Link } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';
import UserContainer from '../containers/UserContainer';
import { Subscribe } from 'unstated';

class ArticlePreview extends React.Component {
    
    handleLike = (e, likePost, id, title, history) => {
        e.preventDefault();

        likePost(id, title)
    }

    render() {
        // get user favourite articles from local storage
        let loveArt = [];
        let loveArticles = localStorage.getItem("loveArticles");
        if (loveArticles != 'undefined' && loveArticles != undefined) { 
            loveArt = loveArticles.split(",").filter(art => art === this.props.title);
        }

        let liked = 'btn btn-primary btn-sm pull-xs-right';
        let disliked = 'btn btn-outline-primary btn-sm pull-xs-right';

        return (
            <Subscribe to={[PostContainer, UserContainer]}>
                {
                    (postThings, userThings) => (
                        <div className="article-preview" key={this.props._id}>
                            <div className="article-meta">
                                <Link to={`/profile/${this.props.author}`}>
                                    <img src={this.props.avaUrl} />
                                </Link>
                                <div className="info">
                                    <Link to={`/profile/${this.props.author}`} className="author">
                                        {this.props.author}
                                    </Link>
                                    <span className="date">{PostContainer.displayTime(this.props.time)}</span>
                                </div>

                                {   
                                    localStorage.getItem("author") ? 
                                        <button className={ loveArt[0] ? liked : disliked }
                                            onClick={(e) => 
                                                this.handleLike(e, postThings.likePost, this.props._id, this.props.title)
                                            }
                                        >
                                            <i className="ion-heart"></i> {this.props.love}
                                        </button>
                                    :
                                        <Link to="/login" className={ loveArt[0] ? liked : disliked }>
                                            <i className="ion-heart"></i> {this.props.love}
                                        </Link>
                                }
                                
                            </div>
                            <Link to={`/article/${this.props._id}`} className="preview-link">
                                <h1>{this.props.title}</h1>
                                <p style={{overflow: "hidden", height: "1.5rem"}}>
                                    {this.props.description}
                                </p>
                                <span>Read more...</span>
                                <ul className="tag-list">
                                    {
                                        this.props.tags ? 
                                        this.props.tags.map( t => 
                                            <li key={t} className="tag-default tag-pill tag-outline">
                                                {t}
                                            </li>
                                        ) : ""
                                    }
                                </ul>
                            </Link>
                        </div>
                    )
                }
            </Subscribe>
        )
    }
}

export default ArticlePreview;