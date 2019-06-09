module.exports.userSeed=[
    {
        name : "John Doe",
        email : "1111@gmail.com",
        password: "hello01",
        meals : [
            {
                meal_id: 1223,
                date: new Date('April 17, 2019 03:24:00')
            },

            {
                meal_id: 1224,
                date: new Date('April 17, 2019 05:24:00')
            },

            {
                meal_id: 1225,
                date: Date('April 18, 2019 03:28:00')
            }
        ],
        spend_goal:[
            {
                amount: "200",
                effective: Date.now(),
                expires:  Date('May 30, 2019 03:28:00')
            }
        ],
        nutri_plan:[
            {
                calories: 1500,
                carbs: 325,
                fiber:30,
                fat:50,
                effective: Date.now(),
                expires: Date('May 30, 2019 03:28:00')
            }

        ],
        d_plan: {
            plan:"OptionA",
            balance:"2442",
            daily_balance: "30.00"
        },
        diet: [],
        goal: "maintain",
        exercise: "light"
       // profile_pic: "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png"
    },

    {
        name : "Jane Doe",
        email : "2222@gmail.com",
        password: "hello01",
        meals : [
            {
                meal_id: 1223,
                date: new Date('April 17, 2019 03:24:00')
            },

            {
                meal_id: 1224,
                date: new Date('April 17, 2019 05:24:00')
            },

            {
                meal_id: 1225,
                date: Date('April 18, 2019 03:28:00')
            }
        ],
        spend_goal:[
            {
                amount: "200",
                effective: Date.now(),
                expires:  Date('May 30, 2019 03:28:00')
            }
        ],
        nutri_plan:[
            {
                calories: 1500,
                carbs: 325,
                fiber:30,
                fat:50,
                effective: Date.now(),
                expires: Date('May 30, 2019 03:28:00')
            }

        ],
        d_plan: {
            plan:"MelUlm",
            balance:"1000",
            daily_balance: "30.00"
        },
        diet: [],
        goal: "lose",
        exercise: "light"
       // profile_pic: "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png"
    }

];
