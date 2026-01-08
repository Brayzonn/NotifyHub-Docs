---
sidebar_position: 2
---

# Send Email

Send email notifications via SendGrid.

## Basic Usage

```typescript
const job = await client.sendEmail({
  to: "user@example.com",
  subject: "Welcome!",
  body: "<h1>Hello World</h1>",
});
```

## Parameters

### Required

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `to`      | `string` | Recipient email address     |
| `subject` | `string` | Email subject line          |
| `body`    | `string` | Email body (HTML supported) |

### Optional

| Parameter | Type       | Description                             |
| --------- | ---------- | --------------------------------------- |
| `from`    | `string`   | Sender email (requires verified domain) |
| `replyTo` | `string`   | Reply-to email address                  |
| `cc`      | `string[]` | CC recipients                           |
| `bcc`     | `string[]` | BCC recipients                          |

## Examples

### Simple Email

```typescript
await client.sendEmail({
  to: "user@example.com",
  subject: "Order Confirmation",
  body: "<p>Your order #12345 has been confirmed.</p>",
});
```

### HTML Template

```typescript
const template = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; }
    .button { background: #2563eb; color: white; padding: 12px 24px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome {{name}}!</h1>
    <p>Thanks for signing up.</p>
    <a href="{{confirmUrl}}" class="button">Confirm Email</a>
  </div>
</body>
</html>
`;

await client.sendEmail({
  to: user.email,
  subject: "Confirm Your Email",
  body: template
    .replace("{{name}}", user.name)
    .replace("{{confirmUrl}}", confirmUrl),
});
```

### Custom From Address

```typescript
await client.sendEmail({
  to: "user@example.com",
  from: "noreply@yourdomain.com", // Requires verified domain
  subject: "Newsletter",
  body: "<h1>Monthly Update</h1>",
});
```

## Response

```typescript
{
  jobId: 'job_abc123',
  status: 'pending'
}
```

## Error Handling

```typescript
try {
  await client.sendEmail({ ... });
} catch (error) {
  if (error.isStatus(400)) {
    // Invalid email format
  } else if (error.isStatus(403)) {
    // Domain not verified (when using custom from)
  } else if (error.isStatus(429)) {
    // Rate limit exceeded
  }
}
```

## Next Steps

- [Domain Verification](/docs/guides/domain-verification)
- [Email Templates](/docs/examples/email-templates)
- [Check Job Status](/docs/api-reference/job-status)
