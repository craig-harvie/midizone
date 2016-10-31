import PianoControls from '../../modules/piano/PianoControls';
import KeyHandler from '../../extlibs/keypress-2.1.4.min';
import DelayHandler from '../../modules/global/delay';
import AudioManager from '../../modules/audio/AudioManager';
import keycode from 'keycode';

export default class Piano {


	constructor() {
		this.keyListener = new KeyHandler.Listener();
		this.bind();
		this.pianoControls = new PianoControls();
		this.clickedKeyboardKey = null;
		this.allowedKeys = 'abcdefghijklmnopqrstuvwxyz0123456789';
		this.usedKeys = [];

		var sounds = [
			{ id: 'c-2', url: '/notes/1.+C-2.wav' }
		];

		this.audioManager = new AudioManager( sounds, this.doneLoading.bind( this ) );

	}


	doneLoading() {
		console.log( this.audioManager.getBufferLoader() );
	}


	keyupBinding( e ) {

		console.log( keycode( e ) );

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

		this.keyListener.simple_combo( 'shift s', ( e ) => {
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

		$( '.j-key' ).on( 'click', ( e ) => {
			e.preventDefault();
			let $el = $( e.currentTarget );
			$el.toggleClass( 'active' );
			$el.closest( '.key' ).toggleClass( 'active' );
			this.audioManager.playSound( 0, this.audioManager.getBufferLoader().bufferList[ 0 ], this.audioManager.getContext().currentTime, true );
			DelayHandler.delay( () => {
				$el.toggleClass( 'active' );
				$el.closest( '.key' ).toggleClass( 'active' );
			}, 100 );
		} );


	}

}
