<script>
  import { Line } from 'vue-chartjs'
  import ParkirService from '../../services/ParkirService'

  export default {
    extends: Line,
    data () {
      return {
        parkir: [],
        data: [],

        chartData: {
          labels: ["Senin",	"Selasa",	"Rabu",	"Kamis",	"Jumat",	"Sabtu",	"Minggu"],
          datasets: [
            {
              label: 'Siswa',
              data: [],
              fill: false,
              borderColor: 'purple',
              backgroundColor: 'purple',
              borderWidth: 1
            },
            {
              label: 'Guru',
              data: [],
              fill: false,
              borderColor: 'teal',
              backgroundColor: 'teal',
              borderWidth: 1
            },
            {
              label: 'Tamu',
              data: [],
              fill: false,
              borderColor: 'cyan',
              backgroundColor: 'cyan',
              borderWidth: 1
            },
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.initialize()
    },
    created() {
      this.initialize()
    },
    methods: {
      async initialize() {
        console.log('hi')
        await ParkirService.parkingOfTheWeek()
        .then(res => {
          res.data.siswa.forEach(element => {
            if(element == 0) {
              this.chartData.datasets[0].data.push(null)
            } else {
              this.chartData.datasets[0].data.push(element)
            }
          });
          res.data.guru.forEach(element => {
            if(element == 0) {
              this.chartData.datasets[1].data.push(null)
            } else {
              this.chartData.datasets[1].data.push(element)
            }
          });
          res.data.tamu.forEach(element => {
            if(element == 0) {
              this.chartData.datasets[2].data.push(null)
            } else {
              this.chartData.datasets[2].data.push(element)
            }
          });

          this.renderChart(this.chartData, this.options)
        })
        .catch(err => {
          console.log(err)
        })
        
      }
    },
  }
</script>