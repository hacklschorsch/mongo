t = db.sort_unicode;
t.drop();


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



// These are sorted by being piped through
// LC_COLLATE="de_DE.UTF-8" sort -f
t.save({name:'a', prename: 'b'});
t.save({name:'a', prename: 'B'});
t.save({name:'A', prename: 'b'});
t.save({name:'A', prename: 'B'});
t.save({name:'ä', prename: 'B'});
t.save({name:'Ä', prename: 'b'});
t.save({name:'B', prename: 'A'});
t.save({name:'b', prename: 'Ä'});
t.save({name:'ß', prename: 'b'});
t.save({name:'z', prename: 'Z'});

// TODO: Actually set sort order.
nice( { name:1, prename:1 } , "ab,aB,Ab,AB,äB,Äb,BA,bÄ,ßb,zZ", "de_DE case insensitive" );

