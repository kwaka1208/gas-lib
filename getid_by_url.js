/**
 * GoogleスライドのURLからIDを取り出す
 * @module getSlideIdByURL
 * @param {sting} url_ - GoogleスライドのURL
 * @return {string} - スライドのID
 * @memo
 * IN:  https://docs.google.com/presentation/d/18laoESjoKi6sXfmu7YdzzsXB8LJY4E9Fi4KBsWnI7uE/edit#slide=id.p
 * OUT: 18laoESjoKi6sXfmu7YdzzsXB8LJY4E9Fi4KBsWnI7uE
 */
function getSlideIdByURL(url_) {
    regex = "https://docs.google.com/presentation/d/(.+?)/.+"
    return url_.match(regex)[1];
  }
  
  /**
   * GoogleドキュメントのURLからIDを取り出す
   * @module getDocumentIdByURL
   * @param {sting} url_ - GoogleドキュメントのURL
   * @return {string} - ドキュメントのID
   * @memo
   * IN:  https://docs.google.com/document/d/1v9loqfki725E0DzQcDTb4sDnzFh6xSzA6tCZQPp1uRx/edit
   * OUT: 1v9loqfki725E0DzQcDTb4sDnzFh6xSzA6tCZQPp1uRx
   */
  function getDocumentIdByURL(url_) {
    regex = "https://docs.google.com/document/d/(.+?)/.+"
    return url_.match(regex)[1];
  }
  /**
 * GoogleスプレッドシートのURLからIDを取り出す
 * @module getSpreadSheetIdByURL
 * @param {sting} url_ - GoogleスプレッドシートのURL
 * @return {string} - スプレッドシートのID
 * @memo
 * IN:  https://docs.google.com/spreadsheets/d/1ncl1FmwmSAGQ_uNHwex7_tcgM5j97RvPJJU7c1xuffx/edit#gid=0
 * OUT: 1ncl1FmwmSAGQ_uNHwex7_tcgM5j97RvPJJU7c1xuffx
 */
function getSpreadSheetIdByURL(url_) {
    regex = "https://docs.google.com/spreadsheets/d/(.+?)/.+"
    dispLog(url_.match(regex)[1]);
    return url_.match(regex)[1];
  }
  
  
  /**
   * Google DriveのフォルダのURLからIDを取り出す
   * @module getFolderIdByURL
   * @param {sting} url_ - GoogleフォルダのURL
   * @return {string} - フォルダのID
   * @memo
   * IN:  https://drive.google.com/drive/u/0/folders/1BkJYHIv-SJHsaixFM1O7mDoH85iqMgy4
   * OUT: 1BkJYHIv-SJHsaixFM1O7mDoH85iqMgy4
   */
  function getFolderIdByURL(url_) {
    regex = "https://drive.google.com/drive/u/0/"
    if (url_.match(regex) != null) {
      regex = "https://drive.google.com/drive/u/0/folders/(.+)";
    } else {
      regex = "https://drive.google.com/drive/folders/(.+)/?";
    }
    dispLog(regex);
    dispLog(url_.match(regex)[1]);
    return url_.match(regex)[1];
  }
  