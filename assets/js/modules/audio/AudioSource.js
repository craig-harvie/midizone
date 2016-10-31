

export default class AudioSource {


	constructor( _id, _buffer, _context ) {

		if ( !_context.createGain ) {
			_context.createGain = _context.createGainNode;
		}

		let source = _context.createBufferSource();
		let gain = _context.createGain();

		source.playbackRate.value = 1;

		source.buffer = _buffer;

		source.connect( gain );
		gain.connect( _context.destination );

		// source.connect(_context.destination);
		// source.onended = function( source ) {};
		source.loop = true;

		let obj = {
			sourceNode: source,
			gainNode: gain
		};

		return obj;
	}




}
