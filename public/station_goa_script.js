let values = [];

let labels = [0];
console.log("hi");

var ctx = document.getElementById("myChart").getContext("2d");

var chart1 = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: labels,
    datasets: [
      {
        label: "X",
        //backgroundColor: 'rgb(255, 99, 132)',
        borderColor: "rgb(255, 99, 132)",
        data: values,
      },
    ],
  },

  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
},
{
  responsive: true
});

let  post_obj = {};
const btn = document.getElementById("submit");
btn.addEventListener("click", () => {
  //post_obj.bpm = document.getElementById("bpm").value ;
  post_obj.age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  if(sex == "Male")
    post_obj.sex  = 1;
  else
    post_obj.sex = 0;
  post_obj.resting_blood_pressure = document.getElementById("resting_blood_pressure").value;
  post_obj.cholesterol = document.getElementById("cholesterol").value;
  fasting_blood_sugar = document.getElementById("fasting_blood_sugar").value;
  if(fasting_blood_sugar == "yes")
    post_obj.fasting_blood_sugar = 1;
  else
    post_obj.fasting_blood_sugar = 0;
  post_obj.max_heart_rate_achieved = document.getElementById("max_heart_rate_achieved").value;
  exercise_induced_angina = document.getElementById("exercise_induced_angina").value;
  if(exercise_induced_angina == "yes")
    post_obj.exercise_induced_angina = 1;
  else
    post_obj.exercise_induced_angina = 0;
  post_obj.st_depression = document.getElementById("st_depression").value;
  post_obj.num_major_vessels = document.getElementById("num_major_vessels").value;
  chestpain = document.getElementById("chest_pain_type").value;
  post_obj.chest_pain_type_atypical_angina = 0;
  post_obj.chest_pain_type_non_anginal_pain = 0;
  post_obj.chest_pain_type_typical_angina = 0;
  if(chestpain == "atypical angina")
    post_obj.chest_pain_type_atypical_angina = 1;
  else if(chestpain == "non-anginal pain")
    post_obj.chest_pain_type_non_anginal_pain = 1;
  else if(chestpain == "typical angina")
    post_obj.chest_pain_type_typical_angina = 1;
  post_obj.rest_ecg_type_left_ventricular_hypertrophy = 0;
  post_obj.rest_ecg_type_normal 	= 0;
  rest_ecg_type = document.getElementById("rest_ecg_type").value
  if(rest_ecg_type == "normal")
    post_obj.rest_ecg_type_normal  = 1;
  else 
    post_obj.rest_ecg_type_left_ventricular_hypertrophy = 1;
  st_slope = document.getElementById("st_slope_type");
  post_obj.st_slope_type_flat = 0;
  post_obj.st_slope_type_upsloping = 1;
  if(st_slope == "flat")
    post_obj.st_slope_type_flat = 1;
  else
    post_obj.st_slope_type_upsloping = 1;
  thalassemia_type = document.getElementById("thalassemia_type").value;
  post_obj.thalassemia_type_normal 	= 0;
  post_obj.thalassemia_type_nothing 	= 0;
  post_obj.thalassemia_type_reversable_defect = 0;
  post_obj.thalassemia_type_fixed_defect = 0;
  if(thalassemia_type == "nothing")
    post_obj.thalassemia_type_nothing 	= 1;
  else if(thalassemia_type == "fixed defect")
    post_obj.thalassemia_type_fixed_defect = 1;
  else if(thalassemia_type == "normal")
    post_obj.thalassemia_type_normal 	= 1;
  else 
    post_obj.thalassemia_type_reversable_defect = 1;
  console.log(post_obj)
  fetch("http://localhost:3002/uci", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(post_obj)
})
.then(function(res){ 
  res.text().then( res => {
    res = JSON.parse(res);
    output = document.getElementById("prediction");
    if(res.prediction == 1){
      output.innerHTML = "High chance of heart disease";
    }
    else
    output.innerHTML = "Low chance of heart disease";
    console.log("PREDICTION",res) })
  })
  
.catch(function(res){ console.log(res) })
})

let socket = io.connect("http://3.130.18.167:9000");

socket.on("data", (data) => {
  console.log(data);
  if(values.length > 30){
    values.shift();
    labels.shift();
  }
  values.push(data.value);
  labels.push(labels[labels.length - 1] + 1);
  chart1.update();
});


// const ctx = document.getElementById('myChart');
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Red', 'Blue',  'Green'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',

//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// })
