import BufferLoader from '../../modules/audio/BufferLoader';
import AudioSource from '../../modules/audio/AudioSource';

export default class AudioManager {


	constructor( _beats, _loadedCb ) {

		this.sources = {};
		this.buffers = {};
		this.VARIABLES = {
			context: null,
			bufferList: _beats,
			bufferLoader: null
		};
		this.loadedCb = _loadedCb || function() {};

		this.setup();

		return this;
	}


	setup() {

		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.VARIABLES.context = new AudioContext();
		} catch ( e ) {
			alert( 'Sorry about this. Web Audio API is not supported in the browser you are using. Have you thought about updating?' );
		}

		this.VARIABLES.bufferLoader = new BufferLoader( this, this.VARIABLES.context, this.VARIABLES.bufferList, () => {
			if ( typeof this.loadedCb === 'function' ) this.loadedCb();
		} );
		this.VARIABLES.bufferLoader.loadAll();

	}


	addSource( _id, _source ) {
		this.sources[ _id ] = _source;
	}


	getBufferLoader() {
		return this.VARIABLES.bufferLoader;
	}


	getContext() {
		return this.VARIABLES.context;
	}


	getSources() {
		return this.sources;
	}


	setGain( _id, _gain ) {
		this.sources[ _id ].gainNode.gain.value = _gain;
	}

	playSound( _id, _loop ) {
		try {
			this.sources[ _id ].sourceNode.loop = false;
			this.sources[ _id ].sourceNode.start( 0 );
		} catch ( e ) {
			let source = new AudioSource( _id, this.buffers[ _id ], this.VARIABLES.context );
			this.addSource( _id, source );
			this.playSound( _id );
		}
	}

	stopSound( _id ) {

		if ( _id == null ) {

			for ( var beat in this.sources ) {

				try {
					this.sources[ beat ].sourceNode.stop();
				} catch ( e ) {}

			}

		}

		try {
			this.sources[ _id ].sourceNode.stop();
		} catch ( e ) {}



	}

}
