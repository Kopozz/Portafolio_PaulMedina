import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# Inject the .brutalist-title CSS class right before </style>
css_brutalist = """
        /* Brutalist Title */
        .brutalist-title {
            color: #ffffff;
            font-weight: 900;
            position: relative;
            padding-left: 1.5rem;
            text-transform: uppercase;
        }
        .brutalist-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.1em;
            bottom: 0.1em;
            width: 0.4rem;
            background-color: #FF4400;
            box-shadow: 0 0 15px rgba(255, 68, 0, 0.4);
        }
"""

if ".brutalist-title" not in text:
    text = text.replace("</style>", css_brutalist + "\n    </style>")
    print("Injected brutalist-title CSS")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)
