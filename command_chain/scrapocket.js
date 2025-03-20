const PROJECT = 'wogikaze-study';  // Webページを保存するproject

const title = document.title.split(" - ")[0];
const lines = [];
const quote = window.getSelection().toString().trim();  // 選択範囲の文字列を取得
const decodeURI = decodeURIComponent(window.location.href);
const formattedtitle = (() => {
    const isScrapbox = decodeURI.match("scrapbox.io/");
    const isYoutube = decodeURI.match("youtube.com/watch");

    switch (true) {
        case isScrapbox: {
            const re = /scrapbox.io\/(.+)/;
            return `[/${decodeURI.match(re)[1]}]`;
        }
        case isYoutube: {
            const re = /watch\?v=(.+)&?/;
            return `[https://www.youtube.com/watch?v=${decodeURI.match(re)[1]}]`;
        }
        default:
            return `[. ${decodeURI}]${title}`;
    }
})();

lines.push(formattedtitle);
if (quote) {
    lines.push(...quote
        .split(/[\f\n\r]/g)  // 改行区切りで配列化
        .filter(line => line !== '')  // 空行は削除
        .map(line => `>${line}`),  // 引用記号
        '', // 空行
    );
}
const body = encodeURIComponent(lines.join('\n'));
window.open(`https://scrapbox.io/${PROJECT}/${title}?body=${body}`, '_blank'), history.replaceState && history.replaceState({}, null, location.href);