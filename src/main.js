var cities = require('cities');
var url = require('url');
var http = require('http');
var app = http.createServer((request, response) =  & gt);
{
    var city, query;
    query = url.parse(request.url, true).query;
    if (query.zipCode)
        city = cities.zip_lookup(query.zipCode).city;
    else
        city = "not found";
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("&lt;h1&gt;The city you are in is " + city + ".&lt;/h1&gt;");
    response.end();
}
;
app.listen(3000);
