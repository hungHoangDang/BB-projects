import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Article = (props) => {
    const {_id, author, content, title} = {...props}
    return (
        <div style={{
            width: '80%',
            margin: '10px auto',
            padding: '10px',
            textAlign: 'left'
        }}>
        <div>
            <Grid container spacing={24}>
                <Grid item xs={3}>
                    <h1>{title}</h1>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid 
                    item xs={3} 
                    style={{ cursor: "pointer" }}>
                    <Button size="small" onClick={() => props.edit(_id)}>
                        <i className="fas fa-edit fa-lg" ></i>
                    </Button>
                    <Button size="small" onClick={() => props.alert(_id)}>
                        <i className="fas fa-trash-alt fa-lg"></i>
                    </Button>
                </Grid>
            </Grid>
        </div>
        <h4>{author}</h4>
        <p><em>{props.date}</em></p>
        <p style={{
            textAlign: 'left',
            whiteSpace: 'pre-line'}}>{content}</p>
        </div>
    )
}

export default Article;

Article.propTypes = {
    articlesUpdate: PropTypes.arrayOf(PropTypes.object),
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string
}