module.exports = {
  siteName: '平台管理系统',
  copyright: '',
  logoPath: '',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/login/, /resetPassword/],
    },
  ],
}
