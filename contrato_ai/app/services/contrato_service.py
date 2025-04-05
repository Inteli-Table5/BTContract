from app.core.templates import render_template
from app.utils.pdf import gerar_pdf_from_html
from app.services.ia_service import gerar_clausulas_ia
from app.db.database import SessionLocal
from app.db.crud import salvar_contrato

async def gerar_contrato_pdf(dados: dict, nome_arquivo: str) -> str:
    # 1. Gera cláusulas com IA
    clausulas = await gerar_clausulas_ia(dados)

    # 2. Junta os dados com as cláusulas
    dados_completos = {**dados, "clausulas": clausulas}

    # 3. Salva no banco de dados
    db = SessionLocal()
    try:
        print("📝 Salvando no banco:", dados_completos)
        salvar_contrato(db, dados_completos)
    except Exception as e:
        print("⚠️ Erro ao salvar no banco:", e)
    finally:
        db.close()

    # 4. Renderiza o contrato
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

    # 5. Gera e retorna o PDF
    return gerar_pdf_from_html(html, nome_arquivo)

