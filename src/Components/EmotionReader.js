import axios from "axios";


function handleEmotionSet() {
    axios.post('https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/',

        {
            headers: {

                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '9158ae4b07msh28a956118045d24p16ea00jsn7c0c5666fd33',
                'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
            },
            data: "wow"
        }
    )
        .then((res) => {
            console.log(res.data)



        })
        .catch((error) => {
            console.log(error)
        })
}