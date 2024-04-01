var usermodel= require('../model/usemodel');

exports.insert= async (req,res)=>{
    var data=await usermodel.create(req.body);

    res.status(200).json({
        status:data
    })
}
exports.get_data= async(req,res)=>{

    var limit=2;

    var email = req.query.email;
    var query=email ? {email} :req.body;
    var page_no= req.query.page_no;
    
    if(page_no==undefined)
    {
        page_no=1;
    }

    var start=(page_no-1) * limit;

    var data=await usermodel.find(query).limit(limit).skip(start);
    var record_data=await usermodel.find(query).count();
    var total_page = Math.ceil(record_data/limit);
 

    res.status(200).json({
        status:data,
        record_data,
        total_page,
        page_no 
    })
}