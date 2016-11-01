import PianoControls from '../../modules/piano/PianoControls';
import DelayHandler from '../../modules/global/delay';
import keycode from 'keycode';

export default class Piano {


	constructor( _audioManager ) {
		this.bind();
		this.pianoControls = new PianoControls();
		this.audioManager = _audioManager;
	}


	bind() {

		$( '.j-key' ).on( 'click', ( e ) => {
			e.preventDefault();
			let $el = $( e.currentTarget );
			let note = $el.data( 'note' );
			$el.toggleClass( 'active' );
			$el.closest( '.key' ).toggleClass( 'active' );
			this.audioManager.playSound( note, false );
			DelayHandler.delay( () => {
				$el.toggleClass( 'active' );
				$el.closest( '.key' ).toggleClass( 'active' );
			}, 100 );
		} );


	}

}
