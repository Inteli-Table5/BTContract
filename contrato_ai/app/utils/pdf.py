import pdfkit
import tempfile
import os

def gerar_pdf_from_html_bytes(html: str) -> bytes:
    try:
        # Caminho completo e correto
        path_wkhtmltopdf = r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"
        config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)

        # Criar HTML temporário para inspeção
        temp_html = tempfile.NamedTemporaryFile(delete=False, suffix=".html", mode="w", encoding="utf-8")
        temp_html.write(html)
        temp_html.close()
        print("📄 HTML TEMP:", temp_html.name)

        # Tenta gerar PDF
        pdf_bytes = pdfkit.from_file(temp_html.name, False, configuration=config)
        print("✅ PDF gerado com sucesso!")

        # Remove arquivo temporário se quiser
        os.remove(temp_html.name)
        return pdf_bytes

    except Exception as e:
        print("❌ ERRO COMPLETO:")
        import traceback
        traceback.print_exc()
        raise Exception("Falha ao gerar o PDF.")
