let spreadsheet; // スプレッドシート
let panelSheet;  // パネルシート
let workSheet;   // ワークシート
let srcFolderId; // コピー元フォルダ
let dstFolderId; // コピー先フォルダ
let sheetRow;
let startRow;
let unitRow;

function setup() {
spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
panelSheet = spreadsheet.getSheetByName("パネル");
workSheet  = spreadsheet.getSheetByName("ワークシート");
srcFolderId = panelSheet.getRange("コピー元").getValue(); // コピー元フォルダ
dstFolderId = panelSheet.getRange("コピー先").getValue(); // コピー先フォルダ
startRow    = panelSheet.getRange("開始行").getValue(); // コピー先フォルダ
unitRow    = panelSheet.getRange("処理単位").getValue(); // コピー先フォルダ
sheetRow = 1;
}

//
// Google Driveのフォルダをサブフォルダも含めて全部コピー（再起処理） 
//
function CopyWholeFolder() {
setup();
var srcFolder = DriveApp.getFolderById(srcFolderId);
var dstFolder = DriveApp.getFolderById(dstFolderId);

var dstFolderName = srcFolder.getName();

var newFolder = dstFolder.createFolder(dstFolderName);
copy(srcFolder, newFolder);//コピー元，コピー先
showMsg('完了しました');

}

//
// 再帰関数
// Google Driveのフォルダをサブフォルダも含めて全部コピー（再起処理） 
//
function copyFolderRecursive(srcFolder, newFolder){
var srcFiles = srcFolder.getFiles();//フォルダ内ファイルをゲット
while(srcFiles.hasNext()) {
  var srcFile = srcFiles.next();
  dispLog(srcFile.getName());
  srcFile.makeCopy(srcFile.getName(), newFolder);
}
var srcFolders = srcFolder.getFolders();//フォルダ内フォルダをゲット
while(srcFolders.hasNext()) {
  var nextSrcFolder = srcFolders.next();
  dispLog(nextSrcFolder.getName());
  var nextNewFolder = newFolder.createFolder(nextSrcFolder.getName());
  copyFolderRecursive(nextSrcFolder, nextNewFolder); //再帰処理
}
}

function CopyAllFiles() {
setup();
for (i = startRow; i < startRow + unitRow; i++) {
  var src = workSheet.getRange(i, 2).getValue();
  var dst = workSheet.getRange(i, 3).getValue();
  var log = "済";
  copyFiles(src, dst);
  workSheet.getRange(i, 4).setValue(log);
}
showMsg("コピー完了しました")
}

function copyFiles(srcFolderID, dstFolderID){
var srcFolder = DriveApp.getFolderById(srcFolderID);
var dstFolder = DriveApp.getFolderById(dstFolderID);
dispLog(srcFolder);
var srcFiles = srcFolder.getFiles();//フォルダ内ファイルをゲット
while(srcFiles.hasNext()) {
  var srcFile = srcFiles.next();
  dispLog(srcFile.getName());
  srcFile.makeCopy(srcFile.getName(), dstFolder);
}
}

function createNewTree() {
var sheetRow = 1;
setup();
while(true) {
  list = workSheet.getRange(sheetRow, 1).getValue();
  target = createTree(dstFolderId, list.toString().split("/"));
  workSheet.getRange(sheetRow, 3).setValue(target.getId());
  sheetRow++;
}
showMsg('完了しました');
}

//
//
//
function createTree(targetFolderID, folderList) {
dispLog(folderList);
target = DriveApp.getFolderById(targetFolderID)
for (const folder of folderList) {
  dispLog(folder);
  target = createNewFolder(target, folder);
}
return target;
}

//
// 指定フォルダ内に新しいフォルダを作成。
// 既に同名のフォルダがあればそれを使う。
//
function createNewFolder(target, folderName){
var folders = target.getFolders();
while(folders.hasNext()) {
  var folder = folders.next();
  if (folder.getName() == folderName ) {
    dispLog(folderName +"作成をスキップ")
    return folder;
  }
}
folder = target.createFolder(folderName);
return folder;
}

//
// 全フォルダのフォルダ名とIDのリストを作成
//
function FolderList() {
setup();
//4. 値を取得する
let srcFolder = DriveApp.getFolderById(srcFolderId);
let srcFolders = srcFolder.getFolders();//フォルダ内フォルダをゲット

setFolderList(srcFolder.getName(), srcFolder, workSheet); //再帰処理
// while(srcFolders.hasNext()) {
//   var nextSrcFolder = srcFolders.next();
//   setFolderList(srcFolder.getName(), nextSrcFolder, workSheet); //再帰処理
// }
showMsg('完了しました');
}

function setFolderList(parentFolderName, srcFolder, sheet){
var srcFolders = srcFolder.getFolders();//フォルダ内フォルダをゲット
while(srcFolders.hasNext()) {
  var nextSrcFolder = srcFolders.next();
  let folderName = parentFolderName + '/' + nextSrcFolder.getName();
  let folderID = nextSrcFolder.getId();
  dispLog(folderName);
  dispLog(folderID);
  sheet.getRange(sheetRow,1).setValue(folderName);
  sheet.getRange(sheetRow,2).setValue(folderID);
  sheetRow++;
  setFolderList(folderName, nextSrcFolder, sheet); //再帰処理
}
}
