
=== Modal Builder ===

Contributors:      WordPress Telex
Tags:              block, modal, popup, overlay, custom post type
Tested up to:      6.8
Stable tag:        0.1.0
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A powerful modal and popup builder that integrates seamlessly with the WordPress block editor, allowing you to create stunning modals using any WordPress blocks.

== Description ==

Modal Builder transforms the way you create popups and modals in WordPress. Instead of being limited to basic form builders, you can now use the full power of the block editor to design your modal content.

= Key Features =

* **Block Editor Integration** - Design modals using any WordPress blocks you want
* **Custom Post Type** - Manage all your modals in one place
* **Flexible Triggers** - Choose when to show your modals:
  - On page load
  - After time delay
  - On scroll percentage
  - On click (via CSS selector)
  - On exit intent
* **Display Frequency Control** - Control how often modals appear:
  - Once per session
  - Once per day
  - Always show
* **Device Targeting** - Show modals on specific devices:
  - Desktop only
  - Tablet only
  - Mobile only
  - Or any combination
* **Lightweight & Fast** - Minimal JavaScript and CSS footprint
* **Accessible** - Full keyboard navigation and focus management
* **Smooth Animations** - Beautiful fade-in effects
* **Dismissible** - Close button and optional backdrop click to dismiss

= Use Cases =

* Newsletter signups
* Special offers and promotions
* Important announcements
* Lead generation forms
* Video presentations
* Survey and feedback collection
* Cookie consent notices
* Age verification gates
* Exit intent offers

= How It Works =

1. Create a new Modal from the WordPress admin
2. Design your modal content using any blocks you want
3. Configure trigger conditions (when to show)
4. Set display frequency (how often to show)
5. Choose device visibility (where to show)
6. Publish and watch it work on your site!

The plugin automatically handles all the technical details including:
- Cookie-based frequency management
- Scroll position tracking
- Exit intent detection
- Responsive behavior
- Accessibility features
- Animation timing

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/modal-builder` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Navigate to 'Modals' in the admin menu to create your first modal
4. Design your modal content using the block editor
5. Configure your display settings in the post sidebar
6. Publish your modal

== Frequently Asked Questions ==

= Can I use any WordPress blocks in my modals? =

Yes! The modal content area supports all WordPress blocks, including third-party blocks from other plugins.

= How does the frequency control work? =

The plugin uses cookies to track when a modal has been shown. Based on your settings, it will respect the display frequency you've chosen.

= Can I have multiple modals on the same page? =

Yes, you can create as many modals as you need. Each modal's trigger conditions are evaluated independently.

= Is the modal accessible? =

Absolutely! The modal includes proper ARIA labels, focus trapping, keyboard navigation (ESC to close), and focus restoration when closed.

= Does it work on mobile devices? =

Yes! The modal is fully responsive and you can even choose to show modals only on specific device types.

= How do I trigger a modal on button click? =

Set the trigger to "Click" and provide a CSS selector (like ".open-modal-button" or "#special-offer-btn"). Any element matching that selector will open the modal when clicked.

= Can I customize the modal styling? =

Yes! The modal uses minimal base styles, and you can add custom CSS to match your site's design. The modal content inherits your theme's block styles.

= Does it impact site performance? =

No! The plugin is optimized for performance with minimal JavaScript (under 3KB) and CSS. Modals only load the resources they need.

== Screenshots ==

1. Modal post type management screen
2. Block editor interface for designing modal content
3. Modal display settings panel
4. Frontend modal with smooth animations
5. Mobile responsive modal view

== Changelog ==

= 0.1.0 =
* Initial release
* Custom post type for modals
* Block editor integration
* Multiple trigger options
* Frequency control
* Device targeting
* Accessibility features
* Smooth animations

== Technical Details ==

= Trigger Options =

* **Page Load** - Modal appears immediately when page loads
* **Time Delay** - Modal appears after X seconds
* **Scroll Percentage** - Modal appears when user scrolls to X% of page
* **Click** - Modal appears when element matching CSS selector is clicked
* **Exit Intent** - Modal appears when user moves cursor toward browser close button

= Browser Support =

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

= Performance =

* JavaScript: ~2.8KB minified
* CSS: ~1.2KB minified
* No external dependencies
* Efficient event handling with debouncing
* Cookie-based frequency control

= Accessibility Features =

* Focus trapping within modal
* Keyboard navigation (ESC to close, TAB to navigate)
* ARIA labels and roles
* Focus restoration on close
* Screen reader friendly
