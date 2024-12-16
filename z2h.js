/**
 * 全角英数を半角英数に変換
 * @module getFolderIdByURL
 * @param {sting} str - 変換前文字列
 * @return {string} - 変換後文字列（半角）
 * @memo
 * IN:  https://drive.google.com/drive/u/0/folders/1BkJYHIv-SJHsaixFM1O7mDoH85iqMgy4
 * OUT: 1BkJYHIv-SJHsaixFM1O7mDoH85iqMgy4
 */
function z2h(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}