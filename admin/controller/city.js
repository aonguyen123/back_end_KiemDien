const City = require('./../../model/city');

exports.createCity = async (req, res) => {
    const data = req.body;
    data.forEach( async key => {
        const newCity = new City({
            city: key.city,
            province: key.province,
            area: key.area,
            population: key.population
        });
        const result = await newCity.save();
        if(!result)
        {
            return res.status(400).json({
                status: 'save fail'
            });
        }
    });
    res.json({
        status: 'success'
    });
};
exports.getCity = async (req, res) => {
    const citys = await City.find({}, 'city');
    if(!citys)
    {
        return res.status(400).json({
            status: 'get city fail'
        })
    }
    res.json(citys);
}