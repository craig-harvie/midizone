import PianoControls from '../../modules/piano/PianoControls';
import KeyHandler from '../../extlibs/keypress-2.1.4.min';

export default class Piano {


	constructor() {
		this.keyListener = new KeyHandler.Listener();
		this.bind();
		this.pianoControls = new PianoControls();
	}


	bind() {

		this.keyListener.simple_combo( 'shift s', function() {
			console.log( 'You pressed shift and s' );
		} );

		$( '.j-key-load' ).on( 'click', ( e ) => {
			e.preventDefault();
			e.stopPropagation();
		} );

	}

}
