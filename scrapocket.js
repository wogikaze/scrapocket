javascript: (() => {
    const PROJECT = 'wogikaze-study';  // Webページを保存するproject

    const title = document.title.split(" - ")[0];
    const lines = [];
    const quote = window.getSelection().toString().trim();  // 選択範囲の文字列を取得
    let formattedtitle = "";
    const decodeURI = decodeURIComponent(window.location.href);
    if (decodeURI.match("scrapbox.io/")) {
        const re = /scrapbox.io\/(.+)/;
        formattedtitle = `[/${decodeURI.match(re)[1]}]`;
    }
    else if (decodeURI.match("youtube.com/watch")) {
        const re = /watch\?v=(.+)&?/;
        formattedtitle = `[https://www.youtube.com/watch?v=${decodeURI.match(re)[1]}]`;
    }
    else {
        formattedtitle = `[. ${decodeURI}]${title}`;
    }
    lines.push(
        formattedtitle
    );
    if (quote) {
        lines.push(...quote
            .split(/[\f\n\r]/g)  // 改行区切りで配列化
            .filter(line => line !== '')  // 空行は削除
            .map(line => `>${line}`),  // 引用記号
            '', // 空行
        );
    }
    const body = encodeURIComponent(lines.join('\n'));
    alert(body)
    window.open(`https://scrapbox.io/${PROJECT}/${title}?body=${body}`, '_blank'), history.replaceState && history.replaceState({}, null, location.href);

})()