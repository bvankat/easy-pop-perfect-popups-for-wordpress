/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelBody, SelectControl, TextControl, ToggleControl, RangeControl, DateTimePicker } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import './style.scss';
import './editor.scss';

const ModalSettings = () => {
	const postType = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );

	if ( postType !== 'modal' ) {
		return null;
	}

	const { editPost } = useDispatch( 'core/editor' );
	
	const meta = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
	}, [] );

	const {
		modal_trigger_type: triggerType = 'page_load',
		modal_trigger_delay: triggerDelay = 0,
		modal_trigger_scroll_percentage: triggerScrollPercentage = 50,
		modal_trigger_click_selector: triggerClickSelector = '',
		modal_trigger_inactivity_seconds: triggerInactivitySeconds = 30,
		modal_trigger_scroll_element: triggerScrollElement = '',
		modal_page_views_threshold: pageViewsThreshold = 0,
		modal_session_threshold: sessionThreshold = 0,
		modal_frequency_limit: frequencyLimit = 0,
		modal_frequency_period: frequencyPeriod = 'month',
		modal_user_targeting: userTargeting = 'all',
		modal_devices: devices = 'all',
		modal_browsers: browsers = 'all',
		modal_schedule_start: scheduleStart = '',
		modal_schedule_end: scheduleEnd = '',
		modal_referrer_filter: referrerFilter = '',
		modal_position: position = 'center',
		modal_animation: animation = 'fade',
		modal_overlay_opacity: overlayOpacity = 75,
		modal_show_close_button: showCloseButton = true,
		modal_backdrop_close: backdropClose = true,
		modal_esc_close: escClose = true,
	} = meta;

	const [ showScheduleStart, setShowScheduleStart ] = useState( false );
	const [ showScheduleEnd, setShowScheduleEnd ] = useState( false );

	const updateMeta = ( key, value ) => {
		editPost( { meta: { [ key ]: value } } );
	};

	return (
		<>
			<PluginDocumentSettingPanel
				name="modal-triggers"
				title={ __( 'Triggers', 'modal-builder' ) }
				icon="admin-settings"
			>
				<SelectControl
					label={ __( 'Trigger Type', 'modal-builder' ) }
					value={ triggerType }
					options={ [
						{ label: __( 'On Page Load', 'modal-builder' ), value: 'page_load' },
						{ label: __( 'On Scroll', 'modal-builder' ), value: 'scroll' },
						{ label: __( 'On Click', 'modal-builder' ), value: 'click' },
						{ label: __( 'Exit Intent', 'modal-builder' ), value: 'exit_intent' },
						{ label: __( 'After Inactivity', 'modal-builder' ), value: 'inactivity' },
						{ label: __( 'On Scroll To Element', 'modal-builder' ), value: 'scroll_element' },
					] }
					onChange={ ( value ) => updateMeta( 'modal_trigger_type', value ) }
				/>

				{ ( triggerType === 'page_load' || triggerType === 'exit_intent' || triggerType === 'inactivity' ) && (
					<RangeControl
						label={ __( 'Delay (seconds)', 'modal-builder' ) }
						value={ triggerDelay }
						onChange={ ( value ) => updateMeta( 'modal_trigger_delay', value ) }
						min={ 0 }
						max={ 60 }
						help={ __( 'Number of seconds to wait before showing modal', 'modal-builder' ) }
					/>
				) }

				{ triggerType === 'scroll' && (
					<RangeControl
						label={ __( 'Scroll Percentage', 'modal-builder' ) }
						value={ triggerScrollPercentage }
						onChange={ ( value ) => updateMeta( 'modal_trigger_scroll_percentage', value ) }
						min={ 0 }
						max={ 100 }
						help={ __( 'Percentage of page scrolled before showing modal', 'modal-builder' ) }
					/>
				) }

				{ triggerType === 'click' && (
					<TextControl
						label={ __( 'CSS Selector', 'modal-builder' ) }
						value={ triggerClickSelector }
						onChange={ ( value ) => updateMeta( 'modal_trigger_click_selector', value ) }
						help={ __( 'CSS selector for clickable elements (e.g., .button-class, #my-button)', 'modal-builder' ) }
						placeholder=".open-modal"
					/>
				) }

				{ triggerType === 'inactivity' && (
					<RangeControl
						label={ __( 'Inactivity Duration (seconds)', 'modal-builder' ) }
						value={ triggerInactivitySeconds }
						onChange={ ( value ) => updateMeta( 'modal_trigger_inactivity_seconds', value ) }
						min={ 5 }
						max={ 300 }
						help={ __( 'Show modal after this many seconds of no activity', 'modal-builder' ) }
					/>
				) }

				{ triggerType === 'scroll_element' && (
					<TextControl
						label={ __( 'Element Selector', 'modal-builder' ) }
						value={ triggerScrollElement }
						onChange={ ( value ) => updateMeta( 'modal_trigger_scroll_element', value ) }
						help={ __( 'CSS selector for element to trigger modal when scrolled to', 'modal-builder' ) }
						placeholder="#trigger-section"
					/>
				) }
			</PluginDocumentSettingPanel>

			<PluginDocumentSettingPanel
				name="modal-display-rules"
				title={ __( 'Display Rules', 'modal-builder' ) }
				icon="filter"
			>
				<RangeControl
					label={ __( 'Page Views Threshold', 'modal-builder' ) }
					value={ pageViewsThreshold }
					onChange={ ( value ) => updateMeta( 'modal_page_views_threshold', value ) }
					min={ 0 }
					max={ 50 }
					help={ __( 'Show only after user has viewed this many pages (0 = no limit)', 'modal-builder' ) }
				/>

				<RangeControl
					label={ __( 'Session Threshold', 'modal-builder' ) }
					value={ sessionThreshold }
					onChange={ ( value ) => updateMeta( 'modal_session_threshold', value ) }
					min={ 0 }
					max={ 20 }
					help={ __( 'Show only after this many sessions (0 = no limit)', 'modal-builder' ) }
				/>

				<PanelBody title={ __( 'Frequency Capping', 'modal-builder' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Display Limit', 'modal-builder' ) }
						value={ frequencyLimit }
						onChange={ ( value ) => updateMeta( 'modal_frequency_limit', value ) }
						min={ 0 }
						max={ 50 }
						help={ __( 'Maximum number of times to show (0 = unlimited)', 'modal-builder' ) }
					/>

					<SelectControl
						label={ __( 'Time Period', 'modal-builder' ) }
						value={ frequencyPeriod }
						options={ [
							{ label: __( 'Per Session', 'modal-builder' ), value: 'session' },
							{ label: __( 'Per Day', 'modal-builder' ), value: 'day' },
							{ label: __( 'Per Week', 'modal-builder' ), value: 'week' },
							{ label: __( 'Per Month', 'modal-builder' ), value: 'month' },
							{ label: __( 'Lifetime', 'modal-builder' ), value: 'lifetime' },
						] }
						onChange={ ( value ) => updateMeta( 'modal_frequency_period', value ) }
					/>
				</PanelBody>

				<SelectControl
					label={ __( 'User Targeting', 'modal-builder' ) }
					value={ userTargeting }
					options={ [
						{ label: __( 'All Users', 'modal-builder' ), value: 'all' },
						{ label: __( 'Logged In Only', 'modal-builder' ), value: 'logged_in' },
						{ label: __( 'Logged Out Only', 'modal-builder' ), value: 'logged_out' },
					] }
					onChange={ ( value ) => updateMeta( 'modal_user_targeting', value ) }
				/>

				<SelectControl
					label={ __( 'Device Targeting', 'modal-builder' ) }
					value={ devices }
					options={ [
						{ label: __( 'All Devices', 'modal-builder' ), value: 'all' },
						{ label: __( 'Desktop Only', 'modal-builder' ), value: 'desktop' },
						{ label: __( 'Tablet Only', 'modal-builder' ), value: 'tablet' },
						{ label: __( 'Mobile Only', 'modal-builder' ), value: 'mobile' },
					] }
					onChange={ ( value ) => updateMeta( 'modal_devices', value ) }
				/>

				<SelectControl
					label={ __( 'Browser Detection', 'modal-builder' ) }
					value={ browsers }
					options={ [
						{ label: __( 'All Browsers', 'modal-builder' ), value: 'all' },
						{ label: __( 'Chrome Only', 'modal-builder' ), value: 'chrome' },
						{ label: __( 'Firefox Only', 'modal-builder' ), value: 'firefox' },
						{ label: __( 'Safari Only', 'modal-builder' ), value: 'safari' },
						{ label: __( 'Edge Only', 'modal-builder' ), value: 'edge' },
					] }
					onChange={ ( value ) => updateMeta( 'modal_browsers', value ) }
				/>

				<PanelBody title={ __( 'Scheduling', 'modal-builder' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Set Start Date/Time', 'modal-builder' ) }
						checked={ showScheduleStart }
						onChange={ setShowScheduleStart }
					/>
					{ showScheduleStart && (
						<DateTimePicker
							currentDate={ scheduleStart }
							onChange={ ( value ) => updateMeta( 'modal_schedule_start', value ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Set End Date/Time', 'modal-builder' ) }
						checked={ showScheduleEnd }
						onChange={ setShowScheduleEnd }
					/>
					{ showScheduleEnd && (
						<DateTimePicker
							currentDate={ scheduleEnd }
							onChange={ ( value ) => updateMeta( 'modal_schedule_end', value ) }
						/>
					) }
				</PanelBody>

				<TextControl
					label={ __( 'URL Referrer Filter', 'modal-builder' ) }
					value={ referrerFilter }
					onChange={ ( value ) => updateMeta( 'modal_referrer_filter', value ) }
					help={ __( 'Show only to users from specific referrer (e.g., google.com, facebook.com)', 'modal-builder' ) }
					placeholder="google.com"
				/>
			</PluginDocumentSettingPanel>

			<PluginDocumentSettingPanel
				name="modal-display-options"
				title={ __( 'Display Options', 'modal-builder' ) }
				icon="admin-appearance"
			>
				<SelectControl
					label={ __( 'Position', 'modal-builder' ) }
					value={ position }
					options={ [
						{ label: __( 'Center', 'modal-builder' ), value: 'center' },
						{ label: __( 'Top Left', 'modal-builder' ), value: 'top-left' },
						{ label: __( 'Top Center', 'modal-builder' ), value: 'top-center' },
						{ label: __( 'Top Right', 'modal-builder' ), value: 'top-right' },
						{ label: __( 'Bottom Left', 'modal-builder' ), value: 'bottom-left' },
						{ label: __( 'Bottom Center', 'modal-builder' ), value: 'bottom-center' },
						{ label: __( 'Bottom Right', 'modal-builder' ), value: 'bottom-right' },
					] }
					onChange={ ( value ) => updateMeta( 'modal_position', value ) }
				/>

				<SelectControl
					label={ __( 'Animation Effect', 'modal-builder' ) }
					value={ animation }
					options={ [
						{ label: __( 'Fade', 'modal-builder' ), value: 'fade' },
						{ label: __( 'Slide Up', 'modal-builder' ), value: 'slide-up' },
						{ label: __( 'Slide Down', 'modal-builder' ), value: 'slide-down' },
						{ label: __( 'Slide Left', 'modal-builder' ), value: 'slide-left' },
						{ label: __( 'Slide Right', 'modal-builder' ), value: 'slide-right' },
						{ label: __( 'Zoom In', 'modal-builder' ), value: 'zoom-in' },
						{ label: __( 'Zoom Out', 'modal-builder' ), value: 'zoom-out' },
					] }
					onChange={ ( value ) => updateMeta( 'modal_animation', value ) }
				/>

				<RangeControl
					label={ __( 'Overlay Opacity', 'modal-builder' ) }
					value={ overlayOpacity }
					onChange={ ( value ) => updateMeta( 'modal_overlay_opacity', value ) }
					min={ 0 }
					max={ 100 }
					help={ __( 'Background overlay darkness (0 = transparent, 100 = opaque)', 'modal-builder' ) }
				/>

				<ToggleControl
					label={ __( 'Show Close Button', 'modal-builder' ) }
					checked={ showCloseButton }
					onChange={ ( value ) => updateMeta( 'modal_show_close_button', value ) }
				/>

				<ToggleControl
					label={ __( 'Close on Backdrop Click', 'modal-builder' ) }
					checked={ backdropClose }
					onChange={ ( value ) => updateMeta( 'modal_backdrop_close', value ) }
				/>

				<ToggleControl
					label={ __( 'Close with ESC Key', 'modal-builder' ) }
					checked={ escClose }
					onChange={ ( value ) => updateMeta( 'modal_esc_close', value ) }
				/>
			</PluginDocumentSettingPanel>
		</>
	);
};

registerPlugin( 'modal-builder-settings', {
	render: ModalSettings,
} );