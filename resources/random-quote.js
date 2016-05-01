var quoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
var quote;
//Function to generation random quote and append to body
function randomQuote(){
    $.getJSON(quoteURL, null, function(data) {
        $.each(data, function(key, value) {
            if(key == 'quoteText') {
                $("#quote").append("<p id='quote-text'>" + value + "</p>");
                // Trunate quote and add social share information
                quote = value.substring(0, 113) + "... willQuote by @willissss";
            }
            if(key == "quoteAuthor" && value !== "") {
                $("#author").append("<h3 id='author-text'>" + value + "</h3>");
            } else if (key == "quoteAuthor" && value == "") {
                $("#author").append("<h3 id='author-text'>Unkown Author</h3>");
            }
        });
        // Encode and updatequote to new HREF url for social share link
        var quoteURLNew = encodeURIComponent(quote);
        var x = document.getElementById('tweet-a');
        x.setAttribute("href", "https:///twitter.com/intent/tweet?text=" + quoteURLNew);
    });
}
// Load Random quote when page is loading
$(document).load(randomQuote());
// Replace quote with new randomQuote();
$("#new-quote-btn").on("click", function(){
    $('#quote-text').remove();
    $("#author-text").remove();
    randomQuote();
});
