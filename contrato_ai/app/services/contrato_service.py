from app.utils.pdf import gerar_pdf_from_html_bytes
from app.utils.ipfs import upload_pdf_bytes_to_ipfs
from app.services.ia_service import gerar_clausulas_ia
from app.core.templates import render_template
from app.db.database import SessionLocal
from app.db.crud import salvar_contrato

async def gerar_contrato_pdf(dados: dict, nome_arquivo: str) -> str:
    clausulas = await gerar_clausulas_ia(dados)
    dados_completos = {**dados, "clausulas": clausulas}

    # Renderiza o contrato para HTML
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

    # Gera o PDF como bytes (não salva local)
    pdf_bytes = gerar_pdf_from_html_bytes(html)

    # Envia para o IPFS
    url_ipfs = upload_pdf_bytes_to_ipfs(pdf_bytes, nome_arquivo)
    dados_completos["ipfs_url"] = url_ipfs

    # Salva no banco
    db = SessionLocal()
    try:
        salvar_contrato(db, dados_completos)
    finally:
        db.close()

    return url_ipfs  # retorna a URL pública do IPFS
