// eslint-disable-next-line no-undef
const Materialize = M;

$(document).ready(() => {
  $("#login-btn").click(() => {
    let loginData = {
      username: $("#username").val(),
      password: $("#password").val(),
    };

    $.ajax({
      url: "/api/auth/login",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(loginData),
      success: (response) => {
        let result = JSON.parse(response);

        if (result.status === 1) {
          let data = result.data;
          let user = {
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone,
          };
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", data.token);

          let nextPage = sessionStorage.getItem("nextPage");
          sessionStorage.removeItem("nextPage");
          if (nextPage) {
            window.location.href = nextPage;
          } else {
            window.location.href = "/";
          }
        } else {
          Materialize.toast({ html: "login failed, please try again" });
        }
      },
      error: (xhr, status, error) => {
        console.log(error);
      },
    });
  });
});
