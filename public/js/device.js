$(document).ready(() => {
  document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
  });

  document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("tableView");
  });

  document.querySelector(".list").addEventListener("click", function () {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document.querySelector(".products-area-wrapper").classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
  });

  var modeSwitch = document.querySelector(".mode-switch");
  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("light");
    modeSwitch.classList.toggle("active");
  });

  //Open modal add Device
  $('#btnAddDevice').click(function () {
    $('#myModalAddDevice').modal('show');
  })
  //Delete device
  $('button.btn_delete').click(function () {
    const id = $(this).attr('data-id');
    const image = $(this).attr('data-image');

    if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này - " + id) == true) {
      $.ajax({
        type: 'DELETE',
        url: 'http://localhost:5000/DeviceManager/delete-device/' + id + "/" + image,
        success: function (response) {
          $('.delete-row' + id).remove('div')
          alert("Xoá thành công ")
        },
        error: function (err) {
          console.log(err);
        }
      });
    } else {
      console.log("404")
    }
  })

  // Mở modal và nhận giá trị truyền từ view vào modal
  $("button.btn_edit").click(function (event) {
    $('div#myModalEdit').modal('show');
    const id = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "http://localhost:5000/DeviceManager/find-val-update/" + id,
      success: function (response) {
        $('#btnSave').attr("data-id", response._id)
        $('#editName').val(response.deviceName)
        $('#editCategory').val(response.category)
        $('#editQuantity').val(response.quantity)
        $('#editPrice').val(response.price)
        $('#editSupplier').val(response.supplierName)
      }
    });
  })

  // Update Device
  $("#btnSave").click(function () {
    const id = $(this).attr('data-id');
    var data = {
      name: $("#editName").val(),
      category: $("#editCategory").val(),
      quantity: $("#editQuantity").val(),
      price: $("#editPrice").val(),
      supplier: $("#editSupplier").val(),
    }
    if (confirm("Bạn có chắc chắn muốn cập nhật thiết bị này - " + id) == true) {
      $.ajax({
        type: 'PUT',
        url: 'http://localhost:5000/DeviceManager/update-device/' + id,
        dataType: 'json',
        data: data,
        success: function (response) {
          $("div#myModalEdit").modal("hide");
          alert("Cập nhật thành công");
          location.reload();
        },
        error: function (err) {
          console.log(err);
        }
      });
    } else {
      console.log("404");
    }
  });

  // search
  $('.search-bar').blur(() => {
    let txtsearch = $('.search-bar').val();
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5000/DeviceManager/search/' + txtsearch,
      success: function (response) {
        $('.products-row').hide('div')
        $("div#addRowSeach").html(response);

        //
        $('button.btn_delete').click(function () {
          const id = $(this).attr('data-id');
          const image = $(this).attr('data-image');

          if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này - " + id) == true) {
            $.ajax({
              type: 'DELETE',
              url: 'http://localhost:5000/DeviceManager/delete-device/' + id + "/" + image,
              success: function (response) {
                $('.delete-row' + id).remove('div')
                alert("Xoá thành công ")
              },
              error: function (err) {
                console.log(err);
              }
            });
          } else {
            console.log("404")
          }
        })
        //
        $("button.btn_edit").click(function (event) {
          $('div#myModalEdit').modal('show');
          const id = $(this).attr("data-id");
          $.ajax({
            type: "GET",
            url: "http://localhost:5000/DeviceManager/find-val-update/" + id,
            success: function (response) {
              $('#btnSave').attr("data-id", response._id)
              $('#editName').val(response.deviceName)
              $('#editCategory').val(response.category)
              $('#editQuantity').val(response.quantity)
              $('#editPrice').val(response.price)
              $('#editSupplier').val(response.supplierName)
            }
          });
        })
      },
      error: function (err) {
        console.log(err);
      }
    });
  })



})