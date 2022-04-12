<?php
/**
* Plugin Name: NEAR Wallet
* Plugin URI: https://www.temismarketing.com
* Description: NEAR Integration
* Version: 1.2
* Text Domain: near
* Author: Soha A.
* Author URI: https://www.temismarketing.com
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function near_shortcode() {
    include dirname(__FILE__) . '/near.php';
}

add_shortcode('NEAR', 'near_shortcode');

?>