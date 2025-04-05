from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY, timeout=15)

async def gerar_clausulas_ia(dados: dict) -> str:
    prompt = f"""
You are a legal contract assistant specialized in drafting **complete** English purchase agreements.

Generate a **full and professional purchase agreement in English**, including all necessary clauses such as:

- Object of sale
- Payment
- Delivery
- Rights and obligations
- Final provisions
- Jurisdiction
- Termination conditions

Use formal legal English.

The contract must be based on the following data:
- Seller: {dados['vendedor']}
- Buyer: {dados['comprador']}
- Value: {dados['valor']}
- Object: {dados['objeto']}
- Signature Date: {dados['data_assinatura']}
- Signature Location: {dados['local_assinatura']}

Additional details and context (including delivery terms, special conditions, or specific instructions) may be found in the section below:
OBSERVATIONS: {dados['observacoes']}

Draft the entire contract body below. Do not add explanations or formatting instructions. Just the full legal contract content.
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
        max_tokens=2000,
    )

    return response.choices[0].message.content
