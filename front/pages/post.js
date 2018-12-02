import React, { Component } from 'react';
import cachedFetch, { overrideCache } from '../utils/cachedFetch';
import { Config } from '../model/config';
import Article from '../components/Article';

class Index extends Component {
    static async getInitialProps(context) {
        const { slug, apiRoute } = context.query;
        const posts = await cachedFetch(`${Config.apiUrl}posts/?slug=${slug}`);
        const content = posts[0].content.rendered;
        const title = posts[0].title.rendered;
        const { ID, date } = posts[0];
        return { ID, content, title, date };
    }

    render() {
        const { ID, content, title, date } = this.props;
        return <Article key={ID} id={ID} content={content} title={title} date={date} />;
    }
}

export default Index;
