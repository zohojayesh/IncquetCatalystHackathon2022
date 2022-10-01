function checkSub(app,sub_id){

    //
    // 
    // query sub from sub_id

    // if sub exist 
    // return success with user_id

    // else
    // return failure with sub not found error

    let zcql = app.zcql();
    //Construct the query to execute
    let query = `SELECT * FROM Subscription where ROWID=${sub_id}`;
    var resp = {status:'success'};

    return zcql.executeZCQLQuery(query)
    .then(result => {
        console.log('result',result);
        if(result.length > 0){
            resp.user_id  = result[0].Subscription.user_id;
        }else{
            resp.error = 'invalid subscription id';
        }
        return resp;
    }).catch(e=>{
        resp.error = e;
        return resp;
    }).finally(()=>{
        if(resp.error) resp.status='failure';

        console.log('resp',resp);
        return resp;
    });

}
// then use this checkSub fn in every api

// async (req,res)
// sub_resp = await checkSub(sub_id);

// if(sub_res.status=='failure') res.send(200).json({'status':'failure','error':sub_resp.error}); return ;

// else if(sub_res.status=='success') user_id = sub_res.user_id; => continue with api

// console.log(checkSub(123)); 
module.exports = {checkSub};