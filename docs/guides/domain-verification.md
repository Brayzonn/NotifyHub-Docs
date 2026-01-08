---
sidebar_position: 1
---

# Domain Verification

Verify your custom domain to send emails from your own domain.

## Why Verify a Domain?

By default, emails are sent from `noreply@notifyhub.com`. Verifying your domain allows you to send from `noreply@yourdomain.com`, which:

- Improves email deliverability
- Builds trust with recipients
- Maintains brand consistency

## Requirements

:::info Plan Requirement
Custom domains are available on **Indie** and **Startup** plans only.
:::

## Step 1: Request Verification

```typescript
const result = await client.requestDomainVerification("yourdomain.com");

console.log(result.dnsRecords);
// [
//   { type: 'CNAME', host: 'em.yourdomain.com', value: 'sendgrid.net' },
//   { type: 'CNAME', host: 's1._domainkey.yourdomain.com', value: '...' },
//   { type: 'CNAME', host: 's2._domainkey.yourdomain.com', value: '...' }
// ]
```

## Step 2: Add DNS Records

Log in to your DNS provider (Cloudflare, Namecheap, GoDaddy, etc.) and add the CNAME records:

### Example for Cloudflare:

1. Go to DNS settings
2. Click "Add record"
3. Type: `CNAME`
4. Name: `em` (or full host from result)
5. Target: (value from result)
6. Proxy status: DNS only (gray cloud)
7. Repeat for all 3 records

## Step 3: Verify Domain

Wait 15-60 minutes for DNS propagation, then:

```typescript
const status = await client.verifyDomain();

if (status.verified) {
  console.log("Domain verified! ✅");
} else {
  console.log("Not yet verified. Check DNS records.");
}
```

## Step 4: Send from Custom Domain

```typescript
await client.sendEmail({
  from: "noreply@yourdomain.com",
  to: "user@example.com",
  subject: "Hello",
  body: "Sent from custom domain!",
});
```

## Troubleshooting

### Domain Not Verifying?

- Wait longer (DNS can take up to 24 hours)
- Check CNAME records are correct
- Ensure "Proxy" is OFF in Cloudflare
- Use `dig` to verify DNS:

```bash
dig CNAME em.yourdomain.com
```

### Remove Domain

```typescript
await client.removeDomain();
```

## Next Steps

- [Send Email](/docs/api-reference/send-email)
- [Email Templates](/docs/examples/email-templates)
