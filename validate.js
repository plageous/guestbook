export function validateForm(data) {
    console.log("Beginning of validation.")
    console.log(data)
    const errors = [];
    // stores the valid options for meeting
    const validMeetings = ["social", "project", "casual", "other"];

    /*
    fname (string)
    lname (string)
    job (opt string)
    company (opt string)
    linkedin (opt string, but must be valid link)
    email (opt string, but must be vald email, or if mailing = 1)
    meeting (string)
    other (string, but only if meeting = "other")
    message (opt string)
    mailing (0 or 1)
    method (string, form-html or form-text)
    */

    // first name validiation
    if (data.fname.trim() == "") { errors.push("First name is required."); }
    // same, but last name
    if (data.lname.trim() == "") { errors.push("Last name is required."); }
    // meeting validiation
    if (!validMeetings.includes(meeting)) { errors.push("A valid meeting is required."); }
    // mailing list method validation
    if (mailing === 1 && !(method == "form-html" || method == "form-text")) { errors.push("HTML or Text email must be selected."); }

    console.log(errors);
    return { isValid: errors.length === 0, errors};
}