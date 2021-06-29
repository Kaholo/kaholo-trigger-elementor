const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

module.exports = {
  formSubmit: async function (req, res) {
    const body = formatBody(req);
    if (!body.form || !body.form.id) {
      return res.status(500).send("Not a valid webhook request");
    }

    const triggers = await Trigger.find({ plugin: config.name });
    res.sendStatus(200);
    triggers.forEach((trigger) => {
      execTrigger(trigger, body, req.io).catch(console.error);
    });
  }
};

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

async function execTrigger(trigger, body, io) {
  const triggerFormId = trigger.params.find((o) => o.name === "formId");
  const triggerFormIdValue = triggerFormId && triggerFormId.value ? triggerFormId.value : null;

  // If formId param specified but not match either name or id of the trigger
  if (
    triggerFormIdValue !== null &&
    body.form.id !== triggerFormIdValue &&
    body.form.name !== triggerFormIdValue
  ) {
    throw "Form ID do not match";
  }

  const message = `${trigger.name} - ${body.form.name} form submit`;
  mapExecutionService.execute(
    trigger.map,
    null,
    io,
    { config: trigger.configuration },
    message,
    body
  );
}
