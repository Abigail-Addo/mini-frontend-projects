
const current_date = document.querySelector('.current_date');
const date = new Date();

// adjusting the format
const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
};

current_date.textContent = date.toLocaleDateString(undefined, options);

// Sample data
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const figures = [1000, 3000, 2000, 7000, 2000, 4000, 6000, 3000, 2000, 500];

// Function to format Y-axis labels
function formatYAxisLabel(value) {
    if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'k';
    }
    return value.toString();
}
// Get the canvas element
const ctx = document.getElementById('myChart').getContext('2d');

// Create the chart
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [
            {
                data: figures,
                backgroundColor: 'rgba(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Use the formatYAxisLabel function for Y-axis labels
                    callback: formatYAxisLabel
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide legend
            }
        }
    }
});


// Adjust the bar width
myChart.data.datasets.forEach((dataset) => {
    dataset.barPercentage = 0.2; // Change the bar width as a percentage of the category width
    dataset.categoryPercentage = 0.6; // Change the category width as a percentage of the available space
});

myChart.update(); // Update the chart to apply the changes


window.addEventListener('load', () => {
    console.log("Script js is working");
})