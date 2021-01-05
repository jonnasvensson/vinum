<?php
/*
Plugin Name: Edit Custom Fields
Plugin URI:
Description: A simple interface to edit or delete Custom Fields.
Version: 0.1.7
Author: Jay Sitter
Author URI: http://www.jaysitter.com/
Text Domain: ecf
License: GPL2
*/

add_action( 'admin_menu', 'ecf_menu' );
 
// Add link to the Tools menu
function ecf_menu() {
	add_submenu_page( 'tools.php', 'Edit Custom Fields', 'Edit Custom Fields', 'delete_others_posts', 'ecf-options', 'ecf_options' );
}
 
// Render the options page
function ecf_options() {
	global $wpdb;
	?>

	<div class="wrap">

		<?php

		if ( isset( $_POST['delete'] ) ) { // If the user has confirmed a delete action

			if ( $_POST['delete'] == 'confirm' ) {

				if ( !check_admin_referer('ecf_delete' ) ) {
					die( __( 'Nonce doesn&rsquo;t match', 'ecf' ) );
				}

				foreach ( $_POST['checkbox'] as $key => $value ) {
					$wpdb->delete( $wpdb->postmeta, array( 'meta_key' => $value ) );
				}
				echo '<h2>', __( 'Success! The custom fields have been deleted.', 'ecf' ), '</h2>';
			} else {
				echo '<h2>', __( 'Something went wrong.', 'ecf' ), '</h2>';
			}

		} elseif ( isset( $_POST['rename'] ) ) {

			if ( $_POST['rename'] == 'confirm' || $_POST['rename'] == 'undo' ) {

				if ( !check_admin_referer('ecf_rename' ) ) {
					die( __( 'Nonce doesn&rsquo;t match', 'ecf' ) );
				}

				if ( $_POST['rename'] == 'confirm' ) {
					echo '<h2>', __( 'Custom Field renaming complete.', 'ecf' ), '</h2>';
				} else {
					echo '<h2>', __( 'Renaming has been undone.', 'ecf' ), '</h2>';
				}

				$success = false;

				foreach ( $_POST['old_values'] as $key => $value ) {
					$existing = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $wpdb->postmeta WHERE meta_key = '%s'", $value ) );
					if ( count( $existing ) > 0 ) {
						echo '<p style="color:red;">', __( 'The Custom Field', 'ecf' ), ' "', $key, '" ', __( 'could not be renamed to', 'ecf' ), ' "', $value, '" ', __( 'because a Custom Field with that key already exists.', 'ecf' ), '</p>';
					} else {
						$wpdb->update( $wpdb->postmeta, array( 'meta_key' => $value ), array( 'meta_key' => $key ) );
						echo '<p>', __( 'The Custom Field', 'ecf' ), ' "', $key, '" ', __( 'was renamed to', 'ecf' ), ' "', $value, '" . </p>';
						$success = true;
					}
				}

				if ( $success && $_POST['rename'] == 'confirm' ) {
				?>

					<form method="post" action="">

						<input type="hidden" name="rename" value="undo">

						<?php
							foreach ( $_POST['old_values'] as $key => $value ) {
								$existing = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $wpdb->postmeta WHERE meta_id = '%s'", $value ) );
								if ( ! count( $existing ) > 0 ) {
									echo '<input type="hidden" name="old_values[', $value, ']" value="' . $key . '">';
									wp_nonce_field( 'ecf_rename' );
								}
							}

							submit_button( __( 'Undo', 'ecf' ), 'update' );
						?>
					</form>
					<?php
				}

			} else {
			?>

				<h2>Enter new Custom Field names</h2>

				<form method="post" action="">

					<table>

					<?php foreach ( $_POST['checkbox'] as $key => $value ) { ?>

						<tr>
							<td><label><?php echo $value; ?></label></td>
							<td><input name="old_values[<?php echo $value; ?>]" value="<?php echo $value; ?>"></td>
						</tr>

					<?php } ?>

					</table>

					<input type="hidden" value="confirm" name="rename">
					<?php wp_nonce_field( 'ecf_rename' ); ?>
					<?php submit_button( __( 'Rename', 'ecf' ), 'update' ); ?>

				</form>

			<?php } ?>

		<?php } elseif ( isset( $_POST['submit'] ) ) { // If the user has confirmed a delete action ?>

			<h2><?php _e( 'Confirm Custom Field Deletion', 'ecf' ); ?></h2>

			<p><?php _e( 'The following custom fields will be <em><strong>IRREVOCABLY DELETED:</strong></em>', 'ecf' ); ?></p>

			<ul>
				<?php foreach ( $_POST['checkbox'] as $key => $value ) {
						echo '<li>', $value, '</li>';
				} ?>
			</ul>

			<hr>

			<p><?php _e( 'The following corresponding content will <em>also</em> be <em><strong>IRREVOCABLY DELETED:</strong></em>', 'ecf' ); ?></p>

			<form method="post" action="">

				<style>
				<!--
					table.ecf { border-collapse: collapse; }
					table.ecf td, table.ecf th { padding: 0.5em; border: 1px solid #000; }
				-->
				</style>

				<table class="ecf">

					<thead>
						<tr>
							<th><?php _e( 'Post Title', 'ecf' ); ?></th>
							<th><?php _e( 'Custom Field Value', 'ecf' ); ?></th>
						</tr>
					</thead>

					<tbody>
						<?php
						foreach ( $_POST['checkbox'] as $key => $value ) {
							echo '<input type="hidden" name="checkbox[]" value="' . $value . '">';
							echo '<tr><td colspan="2"><h3>',$value,'</h3></td></tr>';

							$rows = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $wpdb->postmeta WHERE meta_key = '%s'", $value ) );

							foreach ( $rows as $row ) {
								echo '<tr>';
									echo '<td><a target="_blank" href="' . get_permalink( $row->post_id ) . '">', get_the_title( $row->post_id ),'</a></td>';
									echo '<td>',$row->meta_value,'</td>';
								echo '</tr>';
							}
						}
						?>
					</tbody>

				</table>
				<?php submit_button( __( 'Yes, DEFINITELY delete these custom fields', 'ecf' ), 'delete' ); ?>
				<?php wp_nonce_field( 'ecf_delete' ); ?>
				<input type="hidden" value="confirm" name="delete">
			</form>

		<?php } else { // User hasn't submitted anything yet; show the list of checkboxes ?>

			<h2><?php _e( 'Edit custom fields', 'ecf' ); ?></h2>

			<?php
			$custom_fields = $wpdb->get_results( "SELECT distinct(`meta_key`) FROM $wpdb->postmeta HAVING meta_key NOT LIKE '\_%'" );

			if ( $custom_fields ) {
			?>

			<div>
				<form method="post" action="">

					<ul>
						<?php

						foreach ( $custom_fields as $custom_field ) {
							$cf_instances = $wpdb->get_results( "SELECT * FROM " . $wpdb->prefix . "postmeta WHERE meta_key = '" . $custom_field->meta_key . "'" );
							echo '<li>';
							echo '<input type="checkbox" id="cf_' . $custom_field->meta_key . '" name="checkbox[]" value="' . $custom_field->meta_key . '">';
							echo ' <label for="cf_' . $custom_field->meta_key . '">', $custom_field->meta_key,' (Used by ' . count( $cf_instances ) . ' posts )</label></li>';
						}

						echo '</ul>';

						?>
					</ul>
					<?php submit_button( __( 'Delete Checked Custom Fields', 'ecf' ), 'delete' ); ?>
					<?php submit_button( __( 'Rename Checked Custom Fields', 'ecf' ), 'update', 'rename' ); ?>
				</form>
			</div>

			<?php } else { ?>

				<h2><?php _e( 'There are no custom fields to edit.', 'ecf' ); ?></h2>

			<?php } ?>

		<?php } ?>

	</div>

<?php
}
?>
