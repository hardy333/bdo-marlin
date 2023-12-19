export const getColorByOrderStatus = (status) => {
    let color = "#211543";
    
    if (status === "გაგზავნილია") {
        color = "#FFC23C";
      } else if (status === "მიწოდებულია") {
        color = "#01C6B5";
      } else if (status === "პროცესშია") {
        color = "#6E0FF5";
      } else if (status === "დადასტურებულია") {
        color = "#FF7BA7";
      } else if (status === "გასაგზავნია") {
        color = "#f55364";
      }else if (status === "რეალიზებულია"){
        color = "#01c6b5";
      }

      return color;
}
