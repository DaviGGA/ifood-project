# Create Account use case

```
input: {
    email: "john.doe@hotmail.com",
    password: "1234asd!",
}

output: {
    accountId: fc651ae2-ca5e-41d2-80bc-b631c5aa2feb
}
```

## Entities
[Account](../entitites/Account.md)

## Requirements

<ol>
  <li>
  <span style="color: green">password</span> and <span style="color: green">confirmPassword</span> must be the same
  </li>
  <li>
    <a href="../value-objects/email.md">Email<a> validations
  </li>
  <li>
    <a href="../value-objects/email.md">Password<a> validations
  </li>
</ol>

## Exceptions

<ul>
  <li>
    Should throw an error when <span style="color: green">password</span> and <span style="color: green">confirmPassword</span> aren't the same
  </li>
    <li>
    Should throw an error when <a href="../value-objects/email.md">Email<a> and <a href="../value-objects/email.md">Password<a> aren't valid
  </li>
</ul>