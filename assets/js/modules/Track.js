import Piano from 'modules/piano/Piano';
import Drumpad from 'modules/drum-pad/Drumpad';
import KeyHandler from 'extlibs/keypress-2.1.4.min';
import AudioManager from 'modules/audio/AudioManager';
import keycode from 'keycode';

export default class Track {


	constructor() {

		this.keyListener = new KeyHandler.Listener();
		this.clickedKeyboardKey = null;
		this.allowedKeys = 'abcdefghijklmnopqrstuvwxyz0123456789';
		this.usedKeys = [];
		this.loader = $( '#samples-loader' );
		this.sounds = this.loadSounds();
		this.audioManager = new AudioManager( this.sounds, this.doneLoading.bind( this ) );

		this.drumpad = new Drumpad( this.audioManager );
		this.piano = new Piano( this.audioManager );

		this.bind();
	}


	loadSounds() {
		var sounds = {};

		$( '[data-note]' ).each( ( index, item ) => {

			let $el = $( item );

			sounds[ $el.data( 'note' ) ] = {
				id: $el.data( 'note' ),
				url: `/notes/${$el.data( 'note' )}.wav`
			};

			this.keyListener.simple_combo( $el.find( 'i' ).text().toLowerCase(), ( e ) => {
				$el.trigger( 'click' );
			} );

		} );

		$( '[data-loop]' ).each( ( index, item ) => {

			let $el = $( item );

			sounds[ $el.data( 'loop' ) ] = {
				id: $el.data( 'loop' ),
				url: `/loops/${$el.data( 'loop' )}.mp3`
			};

			this.keyListener.simple_combo( $el.find( 'i' ).text().toLowerCase(), ( e ) => {
				$el.trigger( 'click' );
			} );

		} );

		return sounds;
	}


	doneLoading() {
		this.loader.addClass( 'hide' );
	}


	keyupBinding( e ) {

		e.stopPropagation();

		if ( this.allowedKeys.indexOf( keycode( e ) ) >= 0 && this.usedKeys.indexOf( keycode( e ) ) === -1 ) {
			$( e.currentTarget ).off( 'keyup' );
			this.usedKeys.push( keycode( e ) );
			this.clickedKeyboardKey.find( '.fa-question' ).replaceWith( `<i>${keycode( e )}</i>` );
			$( e.currentTarget ).removeClass( 'modal--show' );
		} else {
			alert( 'Sorry, you\'ve chosen an invalid key or one that\'s already in use. Only unique alphanumeric characters please' );
		}
	}


	bindModalKeyupHandler() {

		$( '.modal--show' ).off( 'keyup', this.keyupBinding.bind( this ) );
		$( '.modal--show' ).on( 'keyup', this.keyupBinding.bind( this ) );

	}


	bind() {

		this.keyListener.simple_combo( 's', ( e ) => {
			console.log( keycode( e ) );
			console.log( 'You pressed shift and s' );
		} );

		$( '.j-key-load' ).on( 'click', ( e ) => {
			e.preventDefault();
			e.stopPropagation();

			this.clickedKeyboardKey = $( e.currentTarget );
			$( 'body' ).addClass( 'modal--show' );

			this.bindModalKeyupHandler();
		} );


	}

}
