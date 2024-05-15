export default {
  created () {
    this.singleActions = [
      {
        label: this.$t('table.action.modify'),
        action: (obj) => {
          this.createDialog('ContainerUpdateDialog', {
            data: [obj],
            columns: this.columns,
            onManager: this.onManager,
          })
        },
        meta: (obj) => {
          const ret = { validate: true }
          if (obj.status !== 'exited') {
            ret.tooltip = this.$t('compute.repo.helper.modify')
            ret.validate = false
          }
          return ret
        },
      },
      {
        label: this.$t('common.more'),
        actions: (obj) => {
          return [
            {
              label: this.$t('compute.repo.start'),
              action: () => {
                this.onManager('performAction', {
                  steadyStatus: 'running',
                  id: obj.id,
                  managerArgs: {
                    action: 'start',
                  },
                })
              },
              meta: () => {
                return {
                  validate: obj.status === 'exited',
                }
              },
            },
            {
              label: this.$t('compute.repo.stop'),
              action: () => {
                this.createDialog('ContainerShutDownDialog', {
                  data: [obj],
                  columns: this.columns,
                  onManager: this.onManager,
                })
              },
              meta: () => {
                return {
                  validate: obj.status === 'running',
                }
              },
            },
          ]
        },
      },
    ]
  }
}
