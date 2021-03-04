<script>
  import { Doughnut } from 'vue-chartjs'
  import ParkirService from '../../services/ParkirService'
  
  export default {
    extends: Doughnut,
    data () {
      return {
        siswa : 0,
        guru : 0,
        tamu : 0,
        chartData: {
          datasets: [{
              borderWidth: 1,
              backgroundColor: [
                'purple', 
                'teal',
                'cyan',
              ],
              data: []
            }],
            labels: ["Siswa", "Guru", "Tamu"],
        },
        options: {
          legend: {
            display: true,
          },
          maintainAspectRatio: false,
        }
      }
    },
    mounted () {
      this.initialize()
    },
    methods: {
      async initialize() {
        console.log('hi')
        await ParkirService.parkingOfTheWeek()
        .then(res => {
          res.data.siswa.forEach(element => {
            this.siswa += element
          });
          res.data.guru.forEach(element => {
            this.guru += element
          });
          res.data.tamu.forEach(element => {
            this.tamu += element
          });

          this.chartData.datasets[0].data = [this.siswa, this.guru, this.tamu]

          this.renderChart(this.chartData, this.options)
        })
        .catch(err => {
          console.log(err)
        })
        
      }
    },
    
  }
</script>