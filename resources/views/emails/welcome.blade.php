<!DOCTYPE html>
<html>
<head>
    <title>Your Login Credentials</title>
</head>
<body>
    <h2>Hello {{ $user->name }},</h2>

    <p>You have been registered successfully!</p>

    <p><strong>Email:</strong> {{ $user->email }}</p>
    <p><strong>Password:</strong> {{ $password }}</p>

    <p>Please log in and change your password after your first login.</p>

    <p>Thank you,<br/>The Team</p>
</body>
</html>
