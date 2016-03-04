import SKComponent from '../../SKComponent';
interface IMeshComponent extends SKComponent,THREE.Mesh{
  addEventListener( type, listener )

  hasEventListener( type, listener )

  removeEventListener( type, listener )

  dispatchEvent( event ) 

}

export {IMeshComponent as default}
