# Email Documentation

## New User Pending

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.NewUserPending,
  template_variables: {
    username: "put_username_here",
  },
});
```

## New User Account Status

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.NewUserAccountStatus,
  template_variables: {
    username: "put_username_here",
    subject_status: "Declined or Accepted",
    account_status: "DECLINED or ACCEPTED",
  },
});
```

## Pending User Notification to ADMIN

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.PendingUserNotifToAdmin,
  template_variables: {
    admin: "Admin",
    user_fullname: "put_user_fullname_here",
    user_email: "put_user_email_here",
    login_link: "Test_Login_link",
  },
});
```

## User Sending Email

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.UserSendingEmail,
  template_variables: {
    sender_fullname: "Test_Sender_fullname",
    sender_email: "Test_Sender_email",
    message: "Test_Message",
  },
});
```

## Borrow Request

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.BorrowRequest,
  template_variables: {
    sender_fullname: "Test_Sender_fullname",
    user_fullname: "Test_User_fullname",
    sender_email: "Test_Sender_email",
    item_details: "Test_Item_details",
  },
});
```

## Return Request

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.ReturnRequest,
  template_variables: {
    sender_fullname: "Test_Sender_fullname",
    user_fullname: "Test_User_fullname",
    sender_email: "Test_Sender_email",
    item_details: "Test_Item_details",
  },
});
```

## Accept Borrow Request

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.BorrowAccept,
  template_variables: {
    item_details: "Test_Item_details",
    requestingUser_firstname: "Test_RequestingUser_firstname",
    owner_fullname: "Test_Owner_fullname",
    owner_email: "Test_Owner_email",
  },
});
```

## Decline Borrow Request

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.BorrowDecline,
  template_variables: {
    item_details: "Test_Item_details",
    user_fullname: "Test_User_fullname",
  },
});
```

## Accept Return Request

```js
const result = await Email.sendWithTemplate({
  recipient: "put_recipient_email_here",
  email_type: EmailTypes.ReturnAccept,
  template_variables: {
    item_details: "Test_Item_details",
    requestingUser_firstname: "Test_RequestingUser_firstname",
    owner_fullname: "Test_Owner_fullname",
    owner_email: "Test_Owner_email",
  },
});
```

## Decline Return Request

```js
const result = await Email.sendWithTemplate({
  recipient: "uprightchampions@proton.me",
  email_type: EmailTypes.ReturnDecline,
  template_variables: {
    item_details: "Test_Item_details",
    requestingUser_firstname: "Test_RequestingUser_firstname",
    owner_fullname: "Test_Owner_fullname",
    owner_email: "Test_Owner_email",
  },
});
```

## Password Reset

```js
const result = await Email.sendWithTemplate({
  recipient: "uprightchampions@proton.me",
  email_type: EmailTypes.PasswordReset,
  template_variables: {
    user_firstName: "Test_User_firstName",
    resetPasswordLink: "Test_ResetPasswordLink",
  },
});
```
