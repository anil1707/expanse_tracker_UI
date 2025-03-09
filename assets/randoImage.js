const images = 
    {
        1:require("../assets/image1.webp"),
        2:require("../assets/image2.jpg"),
        3:require("../assets/image3.jpeg"),
        4:require("../assets/image4.jpeg"),
        5:require("../assets/image5.jpeg"),
        6:require("../assets/image6.jpeg"),
        7:require("../assets/image7.jpeg"),
    }


const img = require("../assets/image1.webp")

const randomImage = () =>{
    let min = 1;
    let max = 7;
    let random = Math.floor(Math.random()*(max-min + 1)+min)
    return images[random]
}

export default randomImage