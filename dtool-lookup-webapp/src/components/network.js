var D3Network = window['vue-d3-network']
new Vue({
  el: '#app',
  components: {
    D3Network
  },
  data () {
    return {
      nodes: [
        { id: 1, name: "working_directory_1"},
        { id: 2, name: "working_directory_2 (derived from 1)"},
        { id: 3, name: "working_directory_3 (derived from 1)"},
        { id: 4, name: "working_directory_4 (independent)"},
      ],
      links: [
        {sid: 1, tid: 2},
        {sid: 1, tid: 3},
      ],
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5
      },
    }
  },
})
