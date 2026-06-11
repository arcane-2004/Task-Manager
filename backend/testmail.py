import smtplib

EMAIL = "sumitkp153@gmail.com"
PASSWORD = "kqhndfhyjurfqxpu"
server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()

server.login(EMAIL, PASSWORD)

print("SUCCESS")