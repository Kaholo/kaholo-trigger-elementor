# kaholo-trigger-elementor
Kaholo trigger for Elementor

## Methods and Parameters

### Method: Form Action After Submit
**Description:**

This method trigger is form adding a webhook action after form submit.

Please follow the instructions on Elementor in order to set action after submit:

https://docs.elementor.com/article/343-actions-after-submit

The URL to set is:

`<KAHOLO_BASE_URL>/webhook/elementor/form`

**Parameters:**
1. Form name or ID - Specify here the name or the ID of the form. **Note:** if nothing specified, the trigger will work for any form, the name or ID specified should be matched exactly (case sensitive)