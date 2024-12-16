/***
 * 郵便番号を住所に変換する。以下のWeb APIを利用
 * https://github.com/madefor/postal-code-api
 * @param zip 郵便番号7桁
 * @return JSON形式データ
 */
function zip_to_address(zip) {
    zip = z2h(zip)
    pattern = /^([0-9]{3})-?([0-9]{4})$/
    match = zip.match(pattern)
    dispLog('zip3:' + match[1])
    dispLog('zip4:' +match[2])
    return zip34_to_address(match[1], match[2])
  }
  
  /***
   * 郵便番号を住所に変換する。以下のWeb APIを利用
   * https://github.com/madefor/postal-code-api
   * @param zip3 郵便番号の前の3桁
   * @param zip4 郵便番号の後の4桁
   * @return JSON形式データ
   */
  function zip34_to_address(zip3, zip4) {
    zip3 = z2h(zip3)
    zip4 = z2h(zip4)
    base = 'https://madefor.github.io/postal-code-api/api/v1/'
    request = base + zip3 + '/' + zip4 + '.json'
    try {
      json = JSON.parse(UrlFetchApp.fetch(request))
    }
    catch(e) {
      // dispLog(e)
      json = null
    }
    return json
  }
  
  /***
   * 郵便番号から都道府県名を取得する。以下のWeb APIを利用
   * https://github.com/madefor/postal-code-api
   * @param zip3 郵便番号7桁
   * @return 都道府県名
   */
  function zip_to_pref(zip) {
    json = zip_to_address(zip)
    return get_pref(json)
  }
  
  /***
   * 郵便番号から都道府県名を取得する。以下のWeb APIを利用
   * https://github.com/madefor/postal-code-api
   * @param zip3 郵便番号の前の3桁
   * @param zip4 郵便番号の後の4桁
   * @return 都道府県名
   */
  function zip34_to_pref(zip3, zip4) {
    json = zip34_to_address(zip3, zip4)
    return get_pref(json)
  }
  
  /***
   * 郵便番号から基礎自治体名を取得する。以下のWeb APIを利用
   * https://github.com/madefor/postal-code-api
   * @param zip3 郵便番号7桁
   * @return 基礎自治体名
   */
  function zip_to_kiso(zip) {
    json = zip_to_address(zip)
    return get_kiso(json)
  }
  
  /***
   * 郵便番号から基礎自治体名を取得する。以下のWeb APIを利用
   * https://github.com/madefor/postal-code-api
   * @param zip3 郵便番号の前の3桁
   * @param zip4 郵便番号の後の4桁
   * @return 基礎自治体名
   */
  function zip34_to_kiso(zip3, zip4) {
    json = zip34_to_address(zip3, zip4)
    return get_kiso(json)
  }
  
  /***
   * JSONデータから都道府県名を取得
   * @param json 住所情報JSON
   * @return 都道府県名
   */
  function get_pref(json) {
    if (json != null) {
      return json['data'][0]['ja']['prefecture']
    } else {
      return "不明"    
    }
  }
  
  /***
   * JSONデータから基礎自治体名を取得
   * @param json 住所情報JSON
   * @return 基礎自治体名
   */
  function get_kiso(json) {
    if (json != null) {
      return json['data'][0]['ja']['address1']
    } else {
      return "不明"    
    }
  }
  
  function test_zip_to_address() {
    zip = '100０００１'
    dispLog(zip)
    dispLog(zip_to_address(zip))
    dispLog(zip_to_pref(zip))
    dispLog(zip_to_kiso(zip))
  
    zip3 = '000'
    zip4 = '0000'
    dispLog(zip3)
    dispLog(zip4)
    dispLog(zip34_to_address(zip3, zip4))
    dispLog(zip34_to_pref(zip3, zip4))
    dispLog(zip34_to_kiso(zip3, zip4))
  }
  