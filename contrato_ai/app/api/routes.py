
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.models.contrato import ContratoInput
from app.services.contrato_service import gerar_contrato_pdf
import uuid
import os
from app.db.database import SessionLocal
from app.db.models import Contrato
from fastapi import Depends
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/gerar-contrato")
async def gerar_contrato(dados: ContratoInput):
    nome_arquivo = f"contrato_{uuid.uuid4().hex}.pdf"
    caminho = await gerar_contrato_pdf(dados.dict(), nome_arquivo)

    if not caminho or not os.path.exists(caminho):
        raise HTTPException(status_code=500, detail="Falha ao gerar o PDF.")

    return FileResponse(path=caminho, filename=nome_arquivo, media_type='application/pdf')

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/contratos")
def listar_contratos(db: Session = Depends(get_db)):
    contratos = db.query(Contrato).all()
    return contratos


@router.get("/contratos/{id}")
def obter_contrato(id: str, db: Session = Depends(get_db)):
    contrato = db.query(Contrato).filter(Contrato.id == id).first()
    if contrato is None:
        return {"erro": "Contrato não encontrado"}
    return contrato