$("#loginSubmit").click(function() {
  let url = "http://localhost:8181";
  let myData = {
      "username": $("#username").val(),
      "password": md5($("#password").val())
  }
  $.ajax(url + '/admin/login',
   {type: 'POST',
   contentType: 'application/json',
   data: JSON.stringify(myData),
   success: function() {
     window.location.href = url + "/admin/list";
     console.log("What");
   }
  });
})
