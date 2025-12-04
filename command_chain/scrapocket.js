const PROJECT = "wogikaze-study"; // Webページを保存するproject

const title = document.title.split(" - ")[0];
const lines = [];
const quote = window.getSelection().toString().trim(); // 選択範囲の文字列を取得
const url = decodeURIComponent(window.location.href);
const formattedtitle = (() => {
  switch (true) {
    case /scrapbox\.io\//.test(url): {
      const m = url.match(/scrapbox\.io\/(.+)\/(.+)/);
      if (m && m[1] === PROJECT) {
        return `[${m[2]}]`;
      }
      return m ? `[/${m[1]}/${m[2]}]` : `[. ${url}]${title}`;
    }
    case /youtube\.com\/watch/.test(url): {
      const m = url.match(/[?&]v=([^&]+)/);
      return m ? `[https://www.youtube.com/watch?v=${m[1]}]` : `[. ${url}]${title}`;
    }
    default:
      return `[. ${url}]${title}`;
  }
})();

lines.push(formattedtitle);
if (quote) {
  lines.push(
    ...quote
      .split(/[\f\n\r]/g) // 改行区切りで配列化
      .filter((line) => line !== "") // 空行は削除
      .map((line) => line.trim()) // 前後の空白を削除
      .map((line) => line.replaceAll(/\[\d+\]/g, "")) // [数字]を削除
      .map((line) => `>${line}`), // 引用記号
    "" // 空行
  );
}
const body = encodeURIComponent(lines.join("\n"));
const today = new Date();
window.open(
  `https://scrapbox.io/${PROJECT}/${today.toISOString().slice(0, 10)}?body=${body}`,
  "_blank"
);

if (history.replaceState) {
  history.replaceState({}, "", location.href);
}
