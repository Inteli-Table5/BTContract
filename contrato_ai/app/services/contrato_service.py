
from app.core.templates import render_template
from app.utils.pdf import gerar_pdf_from_html
from app.services.ia_service import gerar_clausulas_ia

async def gerar_contrato_pdf(dados: dict, nome_arquivo: str) -> str:
    clausulas = await gerar_clausulas_ia(dados)
    dados_completos = {**dados, "clausulas": clausulas}
    contrato_texto = render_template("estrutura_base.txt", dados_completos)
    contrato_com_br = contrato_texto.replace('\n', '<br>')

    html = f"""
    <html>
      <head>
        <meta charset="utf-8">
        <style>
        body {{ font-family: Arial, sans-serif; padding: 30px; line-height: 1.6; }}
        </style>
      </head>
      <body>
        <h1 style="text-align:center;">Contrato de Compra e Venda</h1>
        <div>{contrato_com_br}</div>
      </body>
    </html>
    """

    return gerar_pdf_from_html(html, nome_arquivo)
