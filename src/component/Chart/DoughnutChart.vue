<script>
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    data () {
      return {
        chartData: {
          datasets: [{
              borderWidth: 1,
              borderColor: [
              '#a06cb8',
              '#839b97',
              '#cfd3ce)'          
              ],
              backgroundColor: [
              '#6a197d',
              '#ffa5b0',
              '#efbbcf)'                
              ],
              data: [1000,	500,	1500]
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
      this.renderChart(this.chartData, this.options)
    }
  }
</script>