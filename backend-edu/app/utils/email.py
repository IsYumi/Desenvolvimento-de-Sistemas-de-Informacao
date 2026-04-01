import smtplib
import ssl
from email.message import EmailMessage
from config import settings

port = 465
smtp_server = "smtp.gmail.com"

def send_token(to_email, token):
    msg = EmailMessage()
    msg.set_content('Seu OTP é: ' + token)
    msg['Subject'] = 'Seu OTP'
    msg['To'] = to_email
    msg['From'] = settings.GMAIL_EMAIL
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(settings.GMAIL_EMAIL, settings.GMAIL_SENHA)
            server.send_message(msg)
        print("Email sent successfully!")
    except smtplib.SMTPException as e:
        print(f"Error sending email: {e}")
