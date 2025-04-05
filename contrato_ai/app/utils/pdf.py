
import pdfkit
import os

def gerar_pdf_from_html_bytes(html: str) -> bytes:
    config = pdfkit.configuration(wkhtmltopdf=r"C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
    return pdfkit.from_string(html, False, configuration=config)

