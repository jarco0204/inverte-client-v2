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
                    label: datasets.label,
                    hoverOffset: 7,
                    hoverBorderColor: "rgba(1, 1, 1, 0.1)",
                    hoverBackgroundColor: backgroundColors,
                    borderRadius: 4,
                    borderWidth: 2,
                    hoverBorderWidth: 2,
                    // borderColor: backgroundColors,
                },
            ],
        },
        options: {
            animation: true,
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
