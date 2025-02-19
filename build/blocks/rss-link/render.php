<?php
/**
 * RSS Link Block
 *
 * @package Build Your Own RSS Feed
 */

/**
 * Render the RSS link block on the frontend.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 * @return string The rendered HTML for the RSS link.
 */

	$href = get_bloginfo( 'rss2_url' );
	printf(
		'<div class="wp-byorf-rss-link"><a id="byorf_link" href="%s">%s</a></div>',
		esc_url( $href ),
		esc_html( $href )
	);
