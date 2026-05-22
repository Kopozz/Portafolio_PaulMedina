import os

path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Only strip backslashes before backticks and dollar signs
text = text.replace("\\`", "`")
text = text.replace("\\$", "$")

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
print("Cleaned escapes successfully.")
