<?php
// TODO: Fix routes per plugin
if ( is_single() ) {
    header( 'Location: /api/v1/posts/' . get_post()->ID );
} elseif ( is_page() ) {
    header( 'Location: /api/v1/pages/' . get_queried_object()->ID );
} else {
    header( 'Location: /api/' );
}