<?php
/**
 * Give notice about a plugin
 *
 * @since 0.1
 */

function am2headless_switch_theme() {
	add_action( 'admin_notices', 'am2headless_switch_notice' );
}
add_action( 'after_switch_theme', 'am2headless_switch_theme' );

/**
 * Adds a message for requiring a plugin to be active.
 *
 * @since 0.1
 */

function am2headless_switch_notice() {
	$message = sprintf( __( 'Check the repo link for documentation.', 'am2-headless' ), 'http://am2studio.hr' );
	printf( '<div class="updated notice is-dismissible"><p>%s</p></div>', $message );
}