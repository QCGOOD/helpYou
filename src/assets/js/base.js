let helpyou = {
  title: "帮你科技后台管理",
  type: 1,
  baseHost: 'http://x.wego168.com/',

  projectName: function () {
    let pathname = window.location.pathname.split('/')[1];
    console.log()
    let name = process.env.NODE_ENV === "production" ? pathname : "helpyou"
    return name
  },
}

export default helpyou