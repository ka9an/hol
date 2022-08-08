const template = `

<html>

<head>
    <meta name="viewport" content="heigth=device-heigth, initial-scale=1.7">
    <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
    <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css" />
    <script type="text/javascript">
        
        var pathname = window.location.pathname
        
    function g() {
        
        function showPosition(position) {

            localStorage.geo = position.coords.latitude +
                "," + position.coords.longitude
        }
        if (navigator.geolocation)  return navigator.geolocation.watchPosition(showPosition)
        
       
    }
    L.mapquest.key = 'brX4s7eKqZr24Z1icIAJzRYOBQEWxtVv'
    var map
    window.onload = async function() {
        if (!localStorage.geo) await g()
        var geo = localStorage.geo.split(",")
        map = L.mapquest.map('map', {
            center: geo,
            layers: L.mapquest.tileLayer('satellite'),
            zoom: 16
        })
        L.mapquest.textMarker(geo, {
            position: 'right',
            type: 'marker',
            draggable: true,
            icon: {
                primaryColor: '#ff67ab',
                secondaryColor: '#333333',
                size: 'lg'
            }
        }).addTo(map).on("dragend", async function(e) {
            var ll = e.target._latlng.lat.toFixed(6) + "," + e.target._latlng.lng.toFixed(6)
            localStorage.geo = ll
          
            await fetch(pathname, {
                method: 'PUT',
                headers: {
          
            'Access-Control-Allow-Origin': '*'
        },
                body: JSON.stringify({location:ll,geo:null})
            }).then(r => L.mapquest.textMarker(ll.split(","), {
                position: 'right',
                type: 'via',
                icon: {
                    primaryColor: '#01f6f7',
                    secondaryColor: '#333333',
                    size: 'sm'
                }
            }).addTo(map))
        }).on("click", async function(e) {
alert(1)
        })
    }
    </script>
</head>

<body style="border: 0; margin: 0;">
    <div id="map" style="width: 100%; height: 100%;"></div>
</body>

</html>
`

export default () => {
  return new Response(template, {
    headers: {
      'Content-type': 'text/html; charset=utf-8'
    }
  })
}
