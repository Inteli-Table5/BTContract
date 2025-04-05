
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.models.contrato import ContratoInput
from app.services.contrato_service import gerar_contrato_pdf
import uuid
import os

router = APIRouter()

@router.post("/gerar-contrato")
async def gerar_contrato(dados: ContratoInput):
    nome_arquivo = f"contrato_{uuid.uuid4().hex}.pdf"
    caminho = await gerar_contrato_pdf(dados.dict(), nome_arquivo)

    if not caminho or not os.path.exists(caminho):
        raise HTTPException(status_code=500, detail="Falha ao gerar o PDF.")

    return FileResponse(path=caminho, filename=nome_arquivo, media_type='application/pdf')
