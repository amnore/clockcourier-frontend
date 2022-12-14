export const columnInfos = {
  rulesColumnInfo: [
    {
      columnName: 'message.relProjects',
      sortable: false,
      isURL: false,
      keyword: "projectName",
      isRouter: true ,
      isDate: false,
      targetURL: "/jump-to-out?url=",
      paramKeyword: "projectUrl"
    },
    {
      columnName: "message.startCommit",
      sortable: false,
      isURL: false,
      keyword: "startCommitBack",
      isRouter: true,
      isDate: false,
      targetURL: "/jump-to-out?url=",
      paramKeyword: "startCommit"
    },
    {
      columnName: "message.endCommit",
      sortable: false,
      isURL: false,
      keyword: "endCommitBack",
      isRouter: true,
      isDate: false,
      targetURL: "/jump-to-out?url=",
      paramKeyword: "endCommit"
    },
    {
      columnName: "message.modifiedFiles",
      sortable: false,
      isURL: false,
      keyword: "fileName",
      isRouter: false,
      isDate: false,
      targetURL: "",
      paramKeyword: ""
    },
  ]
}
