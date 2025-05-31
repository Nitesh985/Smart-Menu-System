export const getOrders = (req, res) => {
    console.log(req.body)


    return res.status(201).json({
        statusCode:201
    })
}