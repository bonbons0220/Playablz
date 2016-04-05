<?php
/*
Plugin Name: Playablz 
Plugin URI: http://zendgame.ocm
Description: A Zendgame WordPress Plugin with a Game in it.

Version: 1.0
Author: Bonnie Souter
Author URI: http://zendgame.com
License: GPLv2
*/
/*  Copyright 2015 Bonnie Souter  (email : bonnie@zendgame.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

if ( !defined( 'WP_ENV' ) ) define('WP_ENV', 'development');

/**
 * Singleton class for setting up the plugin.
 *
 */
final class Playablz_Plugin {

	public $dir_path = '';
	public $dir_uri = '';
	public $admin_dir = '';
	public $lib_dir = '';
	public $templates_dir = '';
	public $css_uri = '';
	public $js_uri = '';

	/**
	 * Returns the instance.
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new Playablz_Plugin;
			$instance->setup();
			$instance->includes();
			$instance->setup_actions();
		}

		return $instance;
	}
	
	/**
	 * Constructor method.
	 */
	private function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this , 'register_playablz_script' ) );

		add_shortcode( 'PLAYABLZ' , array( $this , 'playablz' ) );
	}
	
	function register_playablz_script() {
		if ( strcmp(WP_ENV,'development') === 0 ) {
			wp_register_script( 'pz-script', $this->js_uri . "_playablz.js", array( 'jquery' ), '1.0.0', true );
			wp_register_script( 'math-js', $this->js_uri . "math.min.js" ); //
		} else {
			wp_register_script( 'pz-script', $this->js_uri . "playablz.min.js", array( 'jquery' ), '1.0.0', true );
			wp_register_script( 'math-js', $this->js_uri . "math.js" );
		}
		wp_register_style( 'pz-style', $this->css_uri . "playablz.css" );
	}

	public function playablz( $atts, $content = null, $tagname = null ) {
		wp_enqueue_script( 'pz-script' );
		wp_enqueue_style( 'pz-style' );
		return '';
	}

	/**
	 * Magic method to output a string if trying to use the object as a string.
	 */
	public function __toString() {
		return 'playablz';
	}

	/**
	 * Magic method to keep the object from being cloned.
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Sorry, no can do.', 'playablz' ), '1.0' );
	}

	/**
	 * Magic method to keep the object from being unserialized.
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Sorry, no can do.', 'playablz' ), '1.0' );
	}

	/**
	 * Magic method to prevent a fatal error when calling a method that doesn't exist.
	 */
	public function __call( $method = '', $args = array() ) {
		_doing_it_wrong( "Playablz_Plugin::{$method}", esc_html__( 'Method does not exist.', 'playablz' ), '1.0' );
		unset( $method, $args );
		return null;
	}

	/**
	 * Sets up globals.
	 */
	private function setup() {

		// Main plugin directory path and URI.
		$this->dir_path = trailingslashit( plugin_dir_path( __FILE__ ) );
		$this->dir_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );

		// Plugin directory paths.
		$this->lib_dir       = trailingslashit( $this->dir_path . 'lib'       );
		$this->admin_dir     = trailingslashit( $this->dir_path . 'admin'     );
		$this->templates_dir = trailingslashit( $this->dir_path . 'templates' );

		// Plugin directory URIs.
		$this->css_uri = trailingslashit( $this->dir_uri . 'css' );
		$this->js_uri  = trailingslashit( $this->dir_uri . 'js'  );
	}

	/**
	 * Loads files needed by the plugin.
	 */
	private function includes() {

		// Load class files.
		//require_once( $this->lib_dir . 'class-role.php'         );

		// Load include files.
		//require_once( $this->lib_dir . 'functions.php'                     );
		//require_once( $this->lib_dir . 'functions-admin-bar.php'           );
		//require_once( $this->lib_dir . 'functions-options.php'             );
		//require_once( $this->lib_dir . 'functions-shortcodes.php'          );
		//require_once( $this->lib_dir . 'functions-widgets.php'             );

		// Load template files.
		//require_once( $this->lib_dir . 'template.php' );

		// Load admin files.
		if ( is_admin() ) {

			// General admin functions.
			//require_once( $this->admin_dir . 'functions-admin.php' );
		
			// Plugin settings.
			//require_once( $this->admin_dir . 'class-settings.php' );

		}
	}

	/**
	 * Sets up main plugin actions and filters.
	 */
	private function setup_actions() {

		// Register activation hook.
		register_activation_hook( __FILE__, array( $this, 'activation' ) );
	}

	/**
	 * Method that runs only when the plugin is activated.
	 */
	public function activation() {

	}
	
}

/**
 * Gets the instance of the `Playablz_Plugin` class.  This function is useful for quickly grabbing data
 * used throughout the plugin.
 */
function playablz_plugin() {
	return Playablz_Plugin::get_instance();
}

// Let's roll!
playablz_plugin();