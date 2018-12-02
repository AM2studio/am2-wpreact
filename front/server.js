const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/post/:slug', (req, res) => {
            const actualPage = '/post';
            const queryParams = { slug: req.params.slug, apiRoute: 'post' };
            app.render(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/page/:slug', (req, res) => {
            console.log(req.params.slug);
            const actualPage = '/page';
            const queryParams = { slug: req.params.slug, apiRoute: 'page' };
            app.render(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/category/:slug', (req, res) => {
            const actualPage = '/category';
            const queryParams = { slug: req.params.slug };
            app.render(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/_preview/:id/:wpnonce', (req, res) => {
            const actualPage = '/preview';
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
            app.render(req, res, actualPage, queryParams); // use app.render to bypass ss cache
        });

        server.get('/', (req, res) => {
            app.render(req, res, '/');
        });

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) throw err;
            console.log(`Listening on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
