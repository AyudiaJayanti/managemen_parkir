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
              data: [600,	1150,	342,	3050,	2522,	3241,	1259,],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            },
            {
              label: 'Guru',
              data: [1621,	252,	515,	62,	2522,	3241,	1259,],
              fill: false,
              borderColor: '#2564FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            },
            {
              label: 'Tamu',
              data: [1621,	252,	515,	62,	2522,	3241,	1259,],
              fill: false,
              borderColor: '#2564FF',
              backgroundColor: '#2554FF',
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
      this.renderChart(this.chartData, this.options)
      ParkirService.getAllData()
        .then(res => {
          this.parkir = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      initialize() {
        
      }
    },
  }
</script>