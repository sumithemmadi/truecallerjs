var PhoneNumber = require( 'awesome-phonenumber' );
const number = '+46707123456'
var pn = new PhoneNumber(number,'IN');
pn.isValid( );  // -> true
pn.isMobile( ); // -> true
pn.canBeInternationallyDialled( ); // -> true
pn.getNumber( );                   // -> '+46707123456'
pn.getNumber( 'e164' );            // -> '+46707123456' (default)
pn.getNumber( 'international' );   // -> '+46 70 712 34 56'
pn.getNumber( 'national' );        // -> '070-712 34 56'
pn.getNumber( 'rfc3966' );         // -> 'tel:+46-70-712-34-56'
pn.getNumber( 'significant' );     // -> '707123456'
pn.getRegionCode( );               // -> 'SE'
pn.getCountryCode( );              // -> 46

pn.toJSON( );                  // -> json blob, so that:
var data = JSON.stringify( pn, null, 4 ); // -> This:
console.log(data);
