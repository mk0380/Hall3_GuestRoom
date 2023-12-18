const bookingSchema = require('../models/guestRoom')
const percentageCharged = 0.1

exports.fetchData = async(_,res)=>{
    try {

        var allData = await bookingSchema.find({})

        for (let index = 0; index < allData.length; index++) {
            allData[index].totalCost = "₹" + parseInt(Math.ceil(allData[index].totalCost * percentageCharged)) + " + " + "₹" + parseInt(allData[index].totalCost - parseInt(Math.ceil(allData[index].totalCost * percentageCharged)))

            allData[index].status = allData[index].approvalLevel === "-1" ? "Rejected" : allData[index].approvalLevel === "2" ? "" : allData[index].approvalLevel === "3" ? "Payment 1 Done" : allData[index].approvalLevel === "4" ? "Paid" : ""
        }

        if (allData) {
            res.json({
                success: true,
                allData: allData
            })
        } else {
            res.json({
                success: false,
                message: "Some error occured fetching data"
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: "Some error occured"
        })
    }
}