import React from 'react';
import Link from '../utils/prefetchData';

const Nav = props => {
    const { key, slug, title, content, preload } = props;
    return (
        <article key={key} className="post type-post status-publish format-standard">
            <header className="entry-header">
                <h1 className="entry-title">
                    {slug ? (
                        <Link
                            prefetch={preload}
                            withData={preload}
                            href={`/post?slug=${slug}`}
                            as={`/post/${slug}`}
                        >
                            {title}
                        </Link>
                    ) : (
                        <span rel="bookmark">{title}</span>
                    )}
                </h1>
            </header>
            <div className="entry-content" dangerouslySetInnerHTML={{ __html: content }} />

            <footer className="entry-meta">
                This entry was posted in{' '}
                <a href="#" rel="category">
                    Uncategorized
                </a>{' '}
                on <time className="entry-date">June 4, 2008</time>
                <span className="by-author">
                    {' '}
                    by{' '}
                    <span className="author vcard">
                        <a
                            className="url fn n"
                            href="https://wp-themes.com/?author=1"
                            title="View all posts by Theme Admin"
                            rel="author"
                        >
                            Theme Admin
                        </a>
                    </span>
                </span>
                .{' '}
            </footer>
        </article>
    );
};

export default Nav;
