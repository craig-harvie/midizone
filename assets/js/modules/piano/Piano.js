import PianoControls from '../../modules/piano/PianoControls';

export default class Piano {


	constructor() {
		this.bind();
		this.pianoControls = new PianoControls();
	}


	bind() {

		$( '.j-key-load' ).on( 'click', ( e ) => {
			e.preventDefault();
			e.stopPropagation();


		} );

	}

}
