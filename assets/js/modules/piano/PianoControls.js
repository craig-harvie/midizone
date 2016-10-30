
export default class PianoControls {


	constructor() {
		this.bind();
	}


	bind() {

		$( '#piano-control' ).on( 'click', ( e ) => {
			e.preventDefault();

			$( 'body' ).toggleClass( 'control-hide' );
		} );

	}

}
