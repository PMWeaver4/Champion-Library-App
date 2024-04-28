const { MailtrapClient } = require("mailtrap");
const Emails = {
  Test: process.env.TEST_UUID,
};
// function that validates that the string is defined and not empty
function isUndefinedOrEmpty(string) {
  return string === undefined || string === null || string.length <= 0;
}

// class for email
export default class Email {
  static client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });
  /**
   * @param {{recipient: string, template_UUID: string, template_variables: object}} emailOptions
   * @throws {Error}
   */
  static async sendWithTemplate(emailOptions) {
    const { recipient, template_UUID, template_variables } = emailOptions;
    // if string is undefined or empty === true, throw an error (we dont want that string)
    if (isUndefinedOrEmpty(recipient)) {
      throw new Error("Invalid - recipient is either undefined, empty, or null.");
    }
    if (isUndefinedOrEmpty(template_UUID)) {
      throw new Error("Invalid - template_UUID is either undefined, empty, or null.");
    }
    if (typeof template_variables !== "object") {
      throw new Error("Invalid - template_variables is not an object.");
    }
    return client.send({
      from: { name: process.env.SENDER_NAME, email: process.env.SENDER_EMAIL },
      to: [{ email: recipient }],
      template_uuid: template_UUID,
      template_variables: template_variables,
    });
  }
}
