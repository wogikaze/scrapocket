javascript: (function () {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/readability/0.4.4/Readability.js';
    script.onload = function () {
        var article = new Readability(document.cloneNode(true)).parse();
        var newWin = window.open();
        newWin.document.body.innerHTML = article.content;
    };
    document.body.appendChild(script);
})();