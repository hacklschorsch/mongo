t = db.sort_case_insensitive;
t.drop();

// TODO: Actually tell MongoDB to sort CI. There's no interface for that yet.
function nice( sort , correct , extra ){
    var c = t.find().sort( sort );
    var s = "";
    c.forEach( 
        function(z){
            if ( s.length )
                s += ",";
            s += z.name;
            if ( z.prename )
                s += z.prename;
        }
    );
    print( tojson( sort ) + "\t" + s );
    if ( correct )
        assert.eq( correct , s , tojson( sort ) + "(" + extra + ")" );
    return s;
}

nice( { name:1 }, "AB,Ab,aB,ab,BA", "Case insensitivity");
nice( { name:1, prename:1 }, "ab,Ab,aB,AB,BA", "Case insensitivity and sort stability");

