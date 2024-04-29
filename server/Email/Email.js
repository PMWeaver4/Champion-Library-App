const { MailtrapClient } = require("mailtrap");

// list of email types mapped to their respective uuid
const EmailTypes = {
  NewUserPending: process.env.NEW_USER_PENDING_UUID,
  NewUserAccountStatus: process.env.NEW_USER_ACCOUNT_STATUS_UUID,
  PendingUserNotifToAdmin: process.env.PENDING_USER_NOTIF_TO_ADMIN_UUID,
  UserSendingEmail: process.env.USER_SENDING_EMAIL_UUID,
  BorrowRequest: process.env.BORROW_REQUEST_UUID,
  ReturnRequest: process.env.RETURN_REQUEST_UUID,
  BorrowAccept: process.env.BORROW_ACCEPT_UUID,
  BorrowDecline: process.env.BORROW_DECLINE_UUID,
  ReturnAccept: process.env.RETURN_ACCEPT_UUID,
  ReturnDecline: process.env.RETURN_DECLINE_UUID
};

// function that validates that the string is defined and not empty
function isUndefinedOrEmpty(string) {
  return string === undefined || string === null || string.length <= 0;
}

// class for email
class Email {
  static client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });
  /**
   * @param {{recipient: string, email_type: string, template_variables: Object.<string, string>}} emailOptions
   * @throws {Error}
   */
  static async sendWithTemplate(emailOptions) {
    const { recipient, email_type, template_variables } = emailOptions;
    // if string is undefined or empty === true, throw an error (we dont want that string)
    if (isUndefinedOrEmpty(recipient)) {
      throw new Error("Invalid - recipient is either undefined, empty, or null.");
    }
    if (isUndefinedOrEmpty(email_type)) {
      throw new Error("Invalid - email_type is either undefined, empty, or null.");
    }
    if (typeof template_variables !== "object") {
      throw new Error("Invalid - template_variables is not an object.");
    }
    return Email.client.send({
      from: { name: process.env.SENDER_NAME, email: process.env.SENDER_EMAIL },
      to: [{ email: recipient }],
      template_uuid: email_type,
      template_variables: template_variables,
    });
  }
}

module.exports = { Email, EmailTypes };
