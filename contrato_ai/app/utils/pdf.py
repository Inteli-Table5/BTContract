
import pdfkit
import os

def gerar_pdf_from_html(html: str, nome_arquivo: str) -> str:
    caminho = f"./{nome_arquivo}"
    try:
        config = pdfkit.configuration(wkhtmltopdf=r"C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe")
        pdfkit.from_string(html, caminho, configuration=config)
        return caminho
    except Exception as e:
        print("❌ Erro ao gerar PDF:", e)
        return None
