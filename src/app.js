const {formatBody} = require("./helpers");

async function formSubmit(req, res, settings, triggerControllers) {
  try { 
    const body = formatBody(req);
    const {form_id: reqFormId, form_name: reqFormName} = body;
    triggerControllers.forEach(trigger => {
        const {formId} = trigger.params;
        if (formId && reqFormId !== formId && reqFormName !== formId) return;
        trigger.execute(`${reqFormName} Submitted`, body);
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message);
  };
}

module.exports = {
  formSubmit
};
