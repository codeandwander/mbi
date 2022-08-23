export const masterplan = new MasterPlan(document.getElementById('masterplan'), {
  clientID: '5140',
  jobID: '2000',
  theme: 'light',
  embedType: 'frame',
  thumbWidth: '300',
  autoFullscreen: true,
  showLoginLink: false,
  clientNameLink: false,
  showSpreadNums: false,
  customCss: {
    nestedToc: true,
  },
});
