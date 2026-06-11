import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_USER = os.getenv("MAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("MAIL_PASSWORD")


def send_email(to, subject, body):
    msg = EmailMessage()

    msg["Subject"] = subject
    msg["From"] = "sumitkp153@gmail.com"
    msg["To"] = to

    msg.set_content(body)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(EMAIL_USER, EMAIL_PASSWORD)
    server.send_message(msg)

    server.quit()
