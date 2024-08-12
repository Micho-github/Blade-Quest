const emailContent = (url) =>`
<div
style="
font-family: Arial, sans-serif;
color: #333;
background-color: #f4f4f4;
padding: 20px;
"
>
<div
style="
background-color: #ffffff;
padding: 20px;
border-radius: 10px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
"
>
<div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
  
<h1 style="color: rgb(0, 0, 0); text-align: center; font-size: 32px">
Welcome to Blade Quest!
</h1>

</div>
<p style="font-size: 18px; text-align: center">
Thank you for signing up. Please click the button below to verify your
email address:
</p>

<div style="text-align: center; margin: 20px 0">
<a
  href="${url}"
  target="_blank"
  style="
    display: inline-block;
    padding: 15px 30px;
    font-size: 18px;
    color: #ffffff;
    background-color: rgb(19, 134, 206);
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  "
>
  Verify Email
</a>
</div>

<p style="color: red; text-align: center; font-size: 16px">
This link will expire in 2 hours.
</p>
<p style="text-align: center; font-size: 16px">
If you did not create an account, please ignore this email.
</p>

<div style="text-align: center; margin-top: 30px">
<img
  src="https://bladequest.vercel.app/static/media/Blade-Quest-logo-black.e9fc2fdd901919714c18.png"
  alt="Blade Quest Logo"
  style="width: 300px; height: auto"
/>
</div>

<p
style="
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-top: 30px;
"
>
This is an automated message. Please do not reply to this email as
responses are not monitored.
</p>
</div>
</div>
`;

module.exports = {
    emailContent,
}