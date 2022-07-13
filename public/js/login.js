$(document).ready(function () {
  function checkAccount() {
    let acc = $("#account").val();
    if (acc.trim() == "") {
      $("#tbAcc").html("Bạn chưa nhập tên tài khoản!");
      return false;
    }
    if (acc.trim() != "" && acc !== "admin") {
      $("#tbAcc").html("Tài khoản không tồn tại!!!");
      return false;
    } else {
      $("#tbAcc").html("");
      return true;
    }
  }

  function checkPassword() {
    let pass = $("#password").val();
    if (pass.trim() == "") {
      $("#tbPass").html("Bạn chưa nhập mật khẩu!");
      return false;
    }
    if (pass.trim() != "" && pass != 'abc@123') {
      $("#tbPass").html("");
      return false;
    } else {
      $("#tbPass").html("");
      return true;
    }
  }

  function login (req, res)  {
    if (!checkAccount() || !checkPassword()) {
      alert("Bạn đã nhập sai tài khoản hoặc mật khẩu. Hãy nhập lại");
      return;
    } else if (checkAccount() == true && checkPassword() == true) {
      alert("Đăng nhập thành công");
      window.location = 'http://localhost:5000/DeviceManager'
      
    }
  }
  

  $("#account").blur(checkAccount);
  $("#password").blur(checkPassword);
  $("#btnDN").click(login);
});
