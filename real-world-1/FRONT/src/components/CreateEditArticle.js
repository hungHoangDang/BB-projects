import React from 'react';
import PostContainer from '../containers/PostContainer';
import { Subscribe } from 'unstated';

class CreateEditArticle extends React.Component {
    titleRef = React.createRef()
    contentRef = React.createRef()
    tagsRef = React.createRef()
    descRef = React.createRef()

    // componentDidMount = () => {
    //     if ( this.props.location.pathname !== "/editor" ) {
    //         PostContainer.getPost( this.props.location.pathname );
    //     }
    // }

    handleSubmit = (e, editPost, id) => {
        e.preventDefault();

        const data = {
            title: this.titleRef.current.value.trim(),
            content: this.contentRef.current.value.trim(),
            description: this.descRef.current.value.trim(),
            tags: this.tagsRef.current.value.trim()
        }

        editPost(id, data, this.props.location.pathname, this.props.history);
    }

    render() {
        return (
            <Subscribe to={[PostContainer]}>
            {
                (postThings) => (
                    <div className="editor-page">
                        <div className="container page">
                            <div className="row">
            
                                <div className="col-md-10 offset-md-1 col-xs-12">
                                    <form onSubmit={(e) => this.handleSubmit(e, postThings.editPost, postThings.state.data[0]._id)}>
                                        <fieldset>
                                            <fieldset className="form-group">
                                                <input type="text" 
                                                    className="form-control form-control-lg" 
                                                    ref={this.titleRef}
                                                    defaultValue={postThings.state.data[0].title}
                                                    placeholder="Article Title" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="text" 
                                                    className="form-control"
                                                    ref={this.descRef}
                                                    placeholder="What's this article about?" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <textarea className="form-control" 
                                                    ref={this.contentRef}
                                                    rows="8"
                                                    defaultValue={postThings.state.data[0].content}
                                                    placeholder="Write your article (in markdown)">
                                                    
                                                </textarea>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="text" 
                                                    className="form-control"
                                                    ref={this.tagsRef}
                                                    defaultValue=
                                                        {
                                                            postThings.state.data[0].tags? 
                                                                postThings.state.data[0].tags.join(",") : ""
                                                        }
                                                    placeholder="Enter tags" />
                                                <div className="tag-list"></div>
                                            </fieldset>
                                            <button className="btn btn-lg pull-xs-right btn-primary">
                                                Publish Article
                                            </button>
                                        </fieldset>
                                    </form>
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

export default CreateEditArticle;