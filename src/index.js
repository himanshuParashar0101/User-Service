//product schema


//product_id ,product_name  ,product_type



const productSchema = new  mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    id : {
        type: string,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});



/*      

        app.post("/product" ,  (req,res)=>{
            try{
                if(err)throw err;

            }catch(err){

            }


*/