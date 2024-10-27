// Get starting bid, skills, and age inputs
const startingBid = document.getElementById("startingBid"); // Starting bid input element
const skills = document.getElementsByClassName("skills"); // Skills checkboxes (HTMLCollection)
const age = document.getElementsByName("age"); // Age radio buttons (NodeList)
const reputation = document.getElementsByClassName("reputation"); // Reputation checkboxes (HTMLCollection)

// Main calculate function to be triggered on button click
const calculate = () => {
    let price = Number(startingBid.value); // Convert starting bid to number

    if (!price) {
        alert("Please enter a valid starting bid.");
        return;
    }

    // Calculate adjustments from each category
    price = getCheckboxValuesFilterReduce(skills, price);
    price = getRadioValue(age, price);
    price = getCheckboxValuesForLoop(reputation, price);

    // Display result
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `Final Dowry Price: $${price.toFixed(2)}`;
};

// Filter and reduce for skills (check if checkbox is checked and add its value)
const getCheckboxValuesFilterReduce = (html_collection, price) => {
    let list = Array.from(html_collection).filter(item => item.checked); // Convert to array and filter
    return list.reduce((acc, item) => acc + Number(item.value), price); // Accumulate values
};

// Multiply price based on selected age radio button
const getRadioValue = (node_list, price) => {
    node_list.forEach(item => {
        if (item.checked) {
            price *= Number(item.value); // Multiply by selected age value
        }
    });
    return price;
};

// Adjust price based on reputation using for loop for integer and coefficient values
const getCheckboxValuesForLoop = (html_collection, price) => {
    for (let i = 0; i < html_collection.length; i++) {
        if (html_collection[i].checked) {
            let value = Number(html_collection[i].value);
            price = Number.isInteger(value) ? price + value : price * value;
        }
    }
    return price;
};

// Add event listener to calculate button
document.getElementById("calculateBtn").addEventListener("click", calculate);
