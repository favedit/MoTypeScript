export default class EventDispather{

  public listeners;

	addEventListener( type, listener ) :void{

		if ( this.listeners === undefined ) this.listeners = {};

		var listeners = this.listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	}

	hasEventListener( type, listener ):boolean{

		if ( this.listeners === undefined ) return false;

		var listeners = this.listeners;

		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {

			return true;

		}

		return false;

	}

	removeEventListener( type, listener ) {

		if ( this.listeners === undefined ) return;

		var listeners = this.listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	}

	dispatchEvent( event ) {

		if ( this.listeners === undefined ) return;

		var listeners = this.listeners;
		var listenerArray = listeners[ event.type ];
		if ( listenerArray !== undefined ) {

			event.target = this;

			var array = [];
			var length = listenerArray.length;

			for ( let i = 0; i < length; i ++ ) {

				array[ i ] = listenerArray[ i ];

			}

			for ( let i = length - 1; i >=0; i -- ) {

				array[ i ].call( this, event );

			}

		}

	}
}
