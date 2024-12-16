/***
 * Googleスライドを画像に変換して、指定のGoogleドライブへ保存
 * 
 * @param fileName 保存する画像のファイル名（"{fileName}_連番"となります。
 */

function exportSlideToPNG(fileName,
    format='png',
    folderId = '1BkJYHIv-SJHsaixFM1O7mDoH85iqMgy4',
    slideId = "18laoESjoKi6sXfmu7YdzzsXB8LJY4E9Fi3KBsWnI7uE") {

const presentation = SlidesApp.openById(slideId);
const slides = presentation.getSlides();

slideNumber = 1;
slideNumberDigit = Math.floor(Math.log10(slides.length))+1;
for (slideNumber = 0; slideNumber < slides.length; slideNumber++) {
let padeId = slides[slideNumber].getObjectId();
exportSingleSlide(slideId, format, padeId, folderId, fileName, slideNumber + 1, slideNumberDigit);
}
}

function exportSingleSlide(slideId_, format_, page_id_, folderId_, fileName_, slideNumber_, digit_) {
const url = "https://docs.google.com/presentation/d/" + slideId_ + "/export/" + format_ + "?id=" + slideId_ + "&pageid=" + page_id_;
const options = {
method: "get",
headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
muteHttpExceptions: true
};

const res = UrlFetchApp.fetch(url, options);
if (res.getResponseCode() === 200) {
const folder = DriveApp.getFolderById(folderId_);
name = "";
if (fileName_ != undefined && fileName_ != "") {
name = fileName_ + "_";
}
name += zeroPadding(slideNumber_, digit_) +"." + format_;
folder.createFile(res.getBlob()).setName(name);  
}
}

function zeroPadding(num_, digit_){
return ( Array(digit_).join('0') + num_ ).slice( -digit_ );
}
