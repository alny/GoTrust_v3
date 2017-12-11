export default {

  getFacebookID: (id) => {

    var substring1 = "facebook.com/profile.php?id=";
    var substring2 = "facebook.com/";
    var substring3 = "?fref";
    var substring4 = "&fref";
    var substring5 = "steamcommunity.com/profiles/";
    var substring6 = "steamcommunity.com/id/";

    var test = id.includes(substring1);
    var test2 = id.includes(substring2);
    var test3 = id.includes(substring3);
    var test4 = id.includes(substring4);
    var test5 = id.includes(substring5);
    var test6 = id.includes(substring6);

    if(test6 == true){
      var n = id.lastIndexOf('/');
      var result = id.substring(n + 1);

      return result.toLowerCase();
    }

    if(test5 == true){
      var n = id.lastIndexOf('/');
      var result = id.substring(n + 1);

      return result.toLowerCase();
    }

      if(test == true) {

      var getId = id.split('=')[1]
      if(test4 == true){
        var phpID = getId.substr(0, getId.indexOf('&'));
        return phpID
      }
      return getId.toLowerCase();
    }

    if(test2 == true){
      var n = id.lastIndexOf('/');
      var result = id.substring(n + 1);
      if(test3 == true){
        var faceID = result.substr(0, result.indexOf('?'));
        return faceID.toLowerCase();
      }

      return result.toLowerCase();
    }

    return test.toLowerCase();

  }
}
