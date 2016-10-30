/**
 * Make ajax request
 *
 * @param {string} _url - The url of the endpoint
 * @param {struct} _data - Post data
 * @param {string} _type - HTTP Verb we want to use, defaults to GET
 *
**/
function call( _url, _data='', _type='GET' ) {

	let promise = new jQuery.Deferred();

	var apiCall = $.ajax( {
		url: _url,
		data: _data,
		dataType: 'JSON',
		type: _type
	} );

	promise.abort = function() {
		apiCall.abort();
		this.reject();
	};

	apiCall.then( function( _response ) {
		promise.resolveWith( null, [_response] );
	}, function( _response ) {
		let returnResponse = '';

		try {
			returnResponse = JSON.parse( _response.responseText );
		} catch ( e ) {
			returnResponse = {
				message: 'Failed'
			};
		}
		promise.reject( returnResponse );

	} );

	return promise;

}



/**
 * Wrapper for GET requests
 *
 * @param {string} _url - The url of the endpoint
 *
**/
function get( _url ) {
	return call( _url );
}



/**
 * Wrapper for POST requests
 *
 * @param {string} _url - The url of the endpoint
 * @param {struct} _data - Post data
 *
**/
function post( _url, _data='' ) {
	return call( _url, _data, 'POST' );
}



/**
 * Wrapper for PUT requests
 *
 * @param {string} _url - The url of the endpoint
 * @param {struct} _data - Post data
 *
**/
function put( _url, _data='' ) {
	return call( _url, _data, 'PUT' );
}



/**
 * Wrapper for PUT requests
 *
 * @param {string} _url - The url of the endpoint
 * @param {struct} _data - Post data
 *
**/
function del( _url, _data='' ) {
	return call( _url, _data, 'delete' );
}



module.exports = {
	get: get,
	post: post,
	put: put,
	del: del
};
