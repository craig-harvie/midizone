import AudioSource from 'modules/audio/AudioSource';

export default class BufferLoader {


	constructor( _audiomanager, _context, _urlStruct, _callback ) {

		this.context = _context;
		this.audiomanager = _audiomanager;
		this.urlStruct = _urlStruct;
		this.onload = _callback;
		this.bufferList = {};
		this.loadCount = 0;

	}


	load( _beatObj, _beatId ) {

		Object.size = function( obj ) {

			let size = 0;
			let key = null;

			for ( key in obj ) {
				if ( obj.hasOwnProperty( key ) ) size++;
			}

			return size;

		};

		// Load buffer asynchronously
		var request = new XMLHttpRequest();
		request.open( 'GET', _beatObj.url, true );
		request.responseType = 'arraybuffer';

		request.onload = () => {
			// Asynchronously decode the audio file data in request.response
			this.context.decodeAudioData(
				request.response,
				( buffer ) => {
					if ( !buffer ) {
						return;
					}
					$( '.j_loop[data-id=\'' + _beatId + '\'' ).removeAttr( 'disabled' );
					this.bufferList[ _beatId ] = buffer;
					let source = new AudioSource( _beatId, buffer, this.context );
					this.audiomanager.addSource( _beatId, source );
					this.audiomanager.buffers[ _beatId ] = buffer;
					if ( ++this.loadCount == Object.size( this.urlStruct ) ) {
						this.onload( this.bufferList );
					}
				},
				() => {
				}
			);
		};

		request.onerror = () => {
		};

		request.send();

	}


	loadAll() {
		for ( let id in this.urlStruct ) {
			this.load( this.urlStruct[ id ], id );
		}
	}


	complete() {
		$( '.beat-loader' ).addClass( 'hide' );
		$( '.j_loop' ).removeAttr( 'disabled' );
	}


}
