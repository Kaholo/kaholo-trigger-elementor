function formatBody(req){
    if (!req.get("content-type").includes("urlencode")){
      return req.body;
    }
  
    const body = {};
    for (let key in req.body) {
      const keyParts = key.replace(/]/g, "").split("[");
      keyParts.forEach((keyPart,index)=>{
        let obj = body;
        
        for(let i=0; i<index; i++) {
          if (!obj[keyParts[i]]){
            obj[keyParts[i]] = {};
          }
          obj = obj[keyParts[i]];
        }
        
        if (index == keyParts.length-1){
          obj[keyPart] = req.body[key];
        }
      })
    }
    return body;
}

module.exports = {
    formatBody
};
  