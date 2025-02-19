<?php
/**
 * Render the category tree block on the frontend.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 * @return string The rendered HTML for the category tree.
 */

	$args = array(
		'taxonomy'   => 'category',
		'orderby'    => 'parent,name',
		'hide_empty' => false,
	);

	if ( ! empty( $attributes['excludeCategories'] ) ) {
		$args['exclude'] = explode( ',', $attributes['excludeCategories'] );
	}

	$array = get_terms( $args );

	// Reuse the existing form generation function.
	$html   = array();
	$html[] = byorf_form( $array, 0 );
	$html[] = byorf_map( $array );
	$html[] = byorf_parents( $array );
	$html[] = byorf_js();

	echo implode( "\n", $html );
