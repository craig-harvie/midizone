export default class Drumpad {


	constructor( _audioManager ) {
		this.audioManager = _audioManager;
		this.bind();
	}


	bind() {


		$( '.j-drumpad' ).on( 'click', ( e ) => {
			e.preventDefault();

			let $el = $( e.currentTarget );
			let loop = $el.data( 'loop' );

			if ( $el.hasClass( 'active' ) ) {
				this.audioManager.stopSound( loop );
			} else {
				this.audioManager.playSound( loop, true );
			}

			$el.toggleClass( 'active' );

		} );
	}

}
