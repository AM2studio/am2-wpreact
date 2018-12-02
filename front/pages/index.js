import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import InfiniteScroll from 'react-infinite-scroller';
import Article from '../components/Article';
import { Config } from '../model/config';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            hasMoreItems: true,
            numOfPages: 0
        };
    }

    static async getInitialProps(context) {
        let numOfPages = '';
        const data = await fetch(`${Config.apiUrl}posts`).then(response => {
            if (typeof window === 'undefined') {
                // ss headers
                numOfPages = response.headers._headers['x-wp-totalpages'][0];
            } else {
                response.headers.forEach((value, key) => {
                    if (key === 'x-wp-totalpages') {
                        numOfPages = value;
                    }
                });
                numOfPages = 45;
            }

            return response.json();
        });
        return { posts: data, numOfPages };
    }

    componentDidMount() {
        const prop = this.props;
        this.setState({ posts: prop.posts, numOfPages: parseInt(prop.numOfPages, 10) });
    }

    loadItems = page => {
        // First page is rendered via getInitialProps - ssr & csr
        let hasMoreItems = true;
        const { numOfPages } = this.state;
        if (page === 1) {
            return;
        }
        if (numOfPages === page) {
            hasMoreItems = false;
        }
        fetch(`${Config.apiUrl}posts/?page=${page}`)
            .then(response => response.json())
            .then(response => {
                this.setState(prevState => ({
                    posts: [...prevState.posts, ...response],
                    hasMoreItems
                }));
            });
    };

    render() {
        const loader = <div className="loader">Loading ...</div>;
        const { posts, hasMoreItems } = this.state;
        const items = [];
        posts.map((post, i) => {
            items.push(
                <Article
                    key={post.ID}
                    id={post.ID}
                    content={post.excerpt.rendered}
                    title={post.title.rendered}
                    slug={post.slug}
                    date={post.date}
                    preload={i < 6}
                />
            );
            return true; // eslint fix
        });

        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={pages => this.loadItems(pages)}
                hasMore={hasMoreItems}
                loader={loader}
            >
                {items}
            </InfiniteScroll>
        );
    }
}

export default Index;
