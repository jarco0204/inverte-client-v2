/*!
   @description: Configure the portion accuracy doughnut chart
   @params:
   @return:
   @Comments
   @Coders: GoldyLuck
*/
const PortionDoughnutChartConfig = (labels, datasets, backgroundColors) => {
    return {
        data: {
            labels: labels,
            datasets: [
                {
                    data: datasets.data,
                    backgroundColor: backgroundColors,
                    hoverOffset: 5,
                    hoverBorderColor: "rgba(1, 1, 1, 0.05)",
                    hoverBackgroundColor: backgroundColors,
                    borderAlign: "inner",
                },
            ],
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: "bottom",
                },
            },
        },
    };
};

export default PortionDoughnutChartConfig;
